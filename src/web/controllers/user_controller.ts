import { Request, Response } from 'express'
import { UserService } from '../../services'

export class UserController {
  static async create(req: Request, res: Response): Promise<Response> {
    return res.send('Hello, world!')
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id as string
    const user = await UserService.get(userId)
    return res.send(`User name: ${user?.name}`)
  }
}
