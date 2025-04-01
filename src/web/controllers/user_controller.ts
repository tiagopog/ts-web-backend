import { Request, Response } from 'express'
import { UserService } from '../../services'
import { UserSerializer } from '../serializers/user_serializer'

export class UserController {
  static async create(req: Request, res: Response): Promise<Response> {
    const userAttrs = UserSerializer.deserialize(req.body)
    const user = await UserService.create(userAttrs)
    const json = UserSerializer.serialize(user)
    return res.send(json)
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id as string
    const user = await UserService.get(userId)
    const json = UserSerializer.serialize(user)
    return res.send(json)
  }
}
