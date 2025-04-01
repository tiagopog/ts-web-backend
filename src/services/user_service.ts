import { UserEntity } from 'models/user/user_entity'
import { prisma } from '../config'

export class UserService {
  static async create(userAttrs: Partial<UserEntity>): Promise<UserEntity> {
    return userAttrs as UserEntity
    // const data = userAttrs.validate()
    // const user = await prisma.user.create({ data })
    // return user as UserEntity
  }

  static async get(uuid: string): Promise<UserEntity | null> {
    return prisma.user.findUnique({ where: { uuid } }) as unknown as UserEntity
  }
}
