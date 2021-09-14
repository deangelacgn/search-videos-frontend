
/** @deprecated */
export function formatVideoResponse(raw) {
  return {
    ...raw,
    embed_url: videoEmbedUrl(raw.url),
    thumbnail: videoThumbnail(raw.url),
  }
}

/** @deprecated */
export function videoEmbedUrl(url) {
  const id = videoYouTubeId(url)

  if (id === null) {
    return null
  }

  return `https://youtube.com/embed/${id}`
}

/** @deprecated */
export function videoThumbnail(url) {
  const id = videoYouTubeId(url)

  if (id === null) {
    return null
  }

  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

export function videoYouTubeId(url) {
  const match = url.match(/v=([^&]+)/)

  if (match === null) {
    return null
  }

  return match[1]
}

export function getFirstErrorMessage(error) {
  const detail = error.body.detail
  const firstField = Object.keys(detail)[0]
  const message = `${firstField}: ${detail[firstField]}`
  return message
}

export function isInvalidRequest(error) {
  return (
    error.name === 'HttpError' &&
    [400, 422].includes(error.status)
  )
}

export function needsReauthentication(error) {
  return (
    error.name === 'HttpError' && error.status === 401
  )
}