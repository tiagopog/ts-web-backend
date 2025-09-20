import { NextFunction } from './types'

export function action(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value!

  descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
    try {
      await original.call(target, req, res)
    } catch (error) {
      next(error)
      return
    }
  }

  return descriptor
}
