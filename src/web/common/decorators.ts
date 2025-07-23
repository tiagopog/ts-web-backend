import { NextFunction } from './types'

export const action = (target: any, key: string, descriptor: PropertyDescriptor) => {
  const original = descriptor.value!

  descriptor.value = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await original.call(this, req, res)
    } catch (error) {
      next(error)
      return
    }
  }

  return descriptor
}
