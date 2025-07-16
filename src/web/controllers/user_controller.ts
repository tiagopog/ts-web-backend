import { Request, Response } from 'express'
import { UserService } from '../../services'
import { UserSerializer } from '../serializers/user_serializer'
import { UserSignUpContract } from '../contracts/user_contracts'
import { NextFunction } from 'web/common/types'

export class UserController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    // TODO: design a way to have controller actions wrapped with this try/catch block
    // by default
    try {
      const userAttrs = UserSerializer.deserialize(req.body, UserSignUpContract)
      const user = await UserService.create(userAttrs)
      const json = UserSerializer.serialize(user)
      return res.send(json)
    } catch (error) {
      next(error)
      return
    }
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id as string
    const user = await UserService.get(userId)
    const json = UserSerializer.serialize(user)
    return res.send(json)
  }
}
