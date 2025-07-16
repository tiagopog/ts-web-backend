// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const takeKeys = (obj: Record<any, any>, keys: any[]) => {
  return keys.reduce((result, key) => {
    result[key] = obj[key]
    return result
  }, {})
}
