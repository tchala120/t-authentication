export function isObjectEmpty<T>(obj: T): boolean {
  return Object.keys(obj).length === 0
}
