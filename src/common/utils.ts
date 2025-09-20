import { unknownObj } from '../common/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const takeKeys = (obj: unknownObj, keys: any[]) => {
  return keys.reduce((result: unknownObj, key) => {
    result[key] = obj[key]
    return result
  }, {})
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const excludeKeys = (obj: unknownObj, keys: any[]) => {
  return Object.keys(obj).reduce((result: unknownObj, key) => {
    if (!keys.includes(key)) result[key] = obj[key]
    return result
  }, {})
}

export const cleanObject = (obj: object): object => {
  return Object.entries(obj).reduce(
    (acc: unknownObj, [key, value]) => (value == null ? acc : (acc[key] = value), acc),
    {},
  )
}
