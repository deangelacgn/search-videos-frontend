export async function sleep(ms) {
  return await new Promise(ok => setTimeout(ok, ms))
}

export function filterKeys(data, keys) {
  return Object.fromEntries(
    Object
      .entries(data)
      .filter(pair => keys.includes(pair[0]))
  )
}

export function bindAllMethods(object) {
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === 'function') {
      object[key] = value.bind(object)
    }
  }
}