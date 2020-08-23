export function parse(value = '') {
  console.log('parse -> value', typeof value)
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1))
    } catch (err) {
      return value
    }
  }

  return value
}
