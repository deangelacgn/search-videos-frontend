/* eslint-disable no-unused-vars */
import { videoEmbedUrl, videoThumbnail } from "./utils"
import { filterKeys, sleep } from '../utils'

export class ApiMock {
  constructor(mockDelay) {
    this.mockDelay = mockDelay
    this.refreshToken = null
    this.accessToken = null
  }

  updateRefreshToken(token) {
    this.refreshToken = token
  }

  updateAccessToken(token) {
    this.accessToken = token
  }

  async login(username, password) {
    await sleep(this.mockDelay)

    if (username !== 'test' && password !== 'test') {
      throw new Error('Invalid credentials')
    }

    return {
      user: {
        ...mockUser(),
        username
      },
      access: this._accessToken(),
      refresh: this._refreshToken()
    }
  }

  async signUp(data) {
    await sleep(this.mockDelay)

    if (data.username === 'test') {
      throw new Error('User already exists')
    }

    return {
      user: filterKeys(data, [
        'id', 'username', 'email', 'first_name', 'last_name'
      ]),
      access: this._accessToken(),
      refresh: this._refreshToken()
    }
  }

  async autocomplete(term) {
    await sleep(this.mockDelay)

    if ('yatabe track day'.startsWith(term.toLowerCase())) {
      return [{ text: 'Yatabe Track Day' }]
    } else {
      return [
        { text: 'tv globinho' },
        { text: 'bom dia & cia' }
      ]
    }
  }

  async homepage() {
    await sleep(this.mockDelay)
    return Array(12).fill().map(mockVideo)
  }

  async searchVideos(term, offset, count) {
    await sleep(this.mockDelay)
    return Array(count).fill().map(mockVideo)
  }

  async getVideo(userId, id) {
    await sleep(this.mockDelay)

    const video = mockVideo()

    return {
      ...video,
      id,
      user: {
        ...video.user,
        id: userId
      }
    }
  }

  async getUser(id) {
    await sleep(this.mockDelay)
    return { ...mockUser(), id }
  }

  async getUserVideos(id, offset, count) {
    await sleep(this.mockDelay)
    return Array(count).fill().map(() => ({
      ...mockVideo(),
      id
    }))
  }

  async uploadVideo(userId, video) {
    await sleep(this.mockDelay)
    return {
      ...video,
      id: 1337
    }
  }

  _refreshToken() {
    return (Date.now() + 5 * 60 * 1000).toString()
  }

  _accessToken() {
    return (Date.now() + 30 * 1000).toString()
  }
}

function mockUser() {
  return {
    id: '1',
    username: 'fulano',
    email: 'fulano@bol.com.br',
    first_name: 'Fulano',
    last_name: 'da Silva'
  }
}

function mockVideo() {
  const url = 'https://www.youtube.com/watch?v=F6V7y0brtAQ'

  return {
    id: '1',
    url,
    embed_url: videoEmbedUrl(url),
    thumbnail: videoThumbnail(url),
    title: `Yatabe Track Day`,
    user: { id: '1', username: 'test' },
    description: 'Musica do carrinho',
    published_date: new Date().toISOString(),
    transcript: 'Varias musicas de Jazz\nJojo\nDaydream\nLooking Up'
  }
}

const api = new ApiMock(2000)

export default api