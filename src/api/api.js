/* eslint-disable */

import { Http } from './http'
import { getFirstErrorMessage, isInvalidRequest, needsReauthentication } from './utils'

export class Api {
  constructor(baseUrl) {
    this.http = new Http(baseUrl)
    this.accessToken = null

    requiresAuth(this, [
      'uploadVideo', 'editVideo'
    ])
  }

  onAuthNeeded(fn) {
    this.authNeededFn = fn
    return this
  }

  async login(username, password) {
    return await this.http.request('/api/login/', {
      method: 'POST',
      body: {
        username,
        password
      }
    })
  }

  async signUp(data) {
    let user

    try {
      user = await this.http.request('/api/user/', {
        method: 'POST',
        body: data
      })
    } catch (error) {
      if (isInvalidRequest(error)) {
        throw new Error(getFirstErrorMessage(error))
      }
      throw error
    }

    return await this.login(data.username, data.password)
  }

  async refreshCredentials(refreshToken) {
    return await this.http.request('/api/refresh-token/', {
      method: 'POST',
      body: {
        refresh: refreshToken
      }
    })
  }

  async autocomplete(term) {
    return []
  }

  async homepage() {
    return await this.searchVideos(null, 0, 12)
  }

  async searchVideos(term, offset, count) {
    const videos = await this.http.request('/api/video/', {
      query: {
        search: term,
        offset,
        num_items: count
      }
    })

    return await Promise.all(
      videos.map(video => this.addEmbedInformation(video))
    )
  }

  async getVideo(userId, id) {
    const [user, video] = await Promise.all([
      this.getUser(userId),
      this.http.request(`/api/user/${userId}/video/${id}/`)
    ])

    return await this.addEmbedInformation(video, user)
  }

  async getUser(id) {
    return await this.http.request(`/api/user/${id}/`)
  }

  async getUserVideos(userId, offset, count) {
    const [user, videos] = await Promise.all([
      this.getUser(userId),
      this.http.request(`/api/user/${userId}/video/`, {
        query: { offset, num_items: count }
      })
    ])

    return await Promise.all(
      videos.map(video => this.addEmbedInformation(video, user))
    )
  }

  async uploadVideo(userId, video) {
    const result = await this.http.request(`/api/user/${userId}/video/`, {
      method: 'POST',
      auth: this.accessToken,
      body: video
    })

    result.user = {
      id: result.user,
      username: '-'
    }

    return result
  }

  async editVideo(userId, video) {
    const url = `/api/user/${userId}/video/${video.id}/`

    const request = {
      method: 'PATCH',
      auth: this.accessToken,
      body: {
        ...video,
        id: undefined,
        url: undefined,
        user: undefined
      }
    }

    try {
      await this.http.request(url, request)
    } catch (error) {
      if (isInvalidRequest(error)) {
        throw new Error(getFirstErrorMessage(error))
      }
      throw error
    }

  }

  async addEmbedInformation(video, user = {}) {
    const videoUrl = new URL(video.url)
    let embedUrl;

    if (videoUrl.host.endsWith('ted.com')) {
      const url = new URL(video.url)
      url.host = 'embed.ted.com'
      embedUrl = url.toString();
    } else if (videoUrl.host.endsWith('youtube.com')) {
      const id = new URL(video.url).searchParams.get('v')
      embedUrl = `https://youtube.com/embed/${id}`
    }

    return {
      ...video,
      user: { ...video.user, ...user },
      embed_url: embedUrl,
      // thumbnail: '',
    }

    // const embedInfo = await this.getEmbedInformation(video.url)
    // return { ...video, ...embedInfo, ...user }
  }

  async getEmbedInformation(videoUrl) {
    return await this.http.request('/api/video-oembed/', {
      query: { url: videoUrl }
    })
  }
}

function requiresAuth(object, methods) {
  for (const methodName of methods) {
    const method = object[methodName]

    object[methodName] = async function (...args) {
      let error = null;

      for (let tries = 0; ; tries++) {
        this.accessToken = await this.authNeededFn(tries, error)

        if (!this.accessToken) {
          throw new Error('Can\'t authenticate')
        }

        try {
          return await method.apply(this, args)
        } catch (error) {
          if (needsReauthentication(error)) {
            error = error
          } else {
            throw error
          }
        }
      }
    }

  }
}

const baseUrl = 'http://localhost:8000';

const api = new Api(baseUrl)

export default api