import { Request, Response } from 'express'
import { UserService } from '../../services'
import { UserSerializer } from '../serializers/user_serializer'
import { UserSignUpContract } from '../contracts/user_contracts'
import { action } from '../common/decorators'
import { UserEntity } from '../../models'

export class UserController {
  @action
  static async create(req: Request, res: Response): Promise<Response | void> {
    const userAttrs = UserSerializer.deserialize(req.body, UserSignUpContract, UserEntity)
    const user = await UserService.create(userAttrs)
    const json = UserSerializer.serialize(user)
    return res.send(json)
  }

  @action
  static async show(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id as string
    const user = await UserService.get(userId)
    const json = UserSerializer.serialize(user)
    return res.send(json)
  }
}
