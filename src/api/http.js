export class Http {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl
  }

  async request(path, options = {}) {
    const { method = 'GET', body, query, auth } = options

    const url = this.formatUrl(path, query)

    const headers = {}

    if (auth) {
      headers['Authorization'] = `Bearer ${auth}`
    }

    if (method !== 'GET' && body !== undefined) {
      headers['Content-Type'] = 'application/json'
    }

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body)
    })

    const responseBody = response.status === 204
      ? null
      : await response.json()
    const status = response.status

    if (status >= 400) {
      let message = 'Request failed'

      if (responseBody.detail && typeof responseBody.detail === 'string') {
        message = responseBody.detail
      }

      throw new HttpError(message, status, responseBody)
    }

    return responseBody
  }

  formatUrl(path, query = {}) {
    const urlWithQuery = new URL(this.baseUrl + path)

    for (const key of Object.keys(query)) {
      if (query[key] !== null && query[key] !== undefined) {
        urlWithQuery.searchParams.append(key, query[key])
      }
    }
    
    return urlWithQuery
  }
}

export class HttpError extends Error {
  constructor(message, status, body) {
    super(message)
    this.status = status
    this.body = body
    this.name = 'HttpError'
  }
}