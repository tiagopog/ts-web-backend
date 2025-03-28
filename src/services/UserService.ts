import { UserEntity } from 'models/user/user_entity'
import { prisma } from '../config'

export class UserService {
  static async get(uuid: string): Promise<UserEntity | null> {
    return prisma.user.findUnique({ where: { uuid } })
  }
}
