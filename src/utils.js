export function extend (to, from) {
  for (let key in from) {
    if (from.hasOwnProperty(key)) to[key] = from[key]
  }
}
