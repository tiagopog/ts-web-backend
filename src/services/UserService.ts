import { User } from '@prisma/client'
import { prisma } from '../config'

export class UserService {
  static async get(uuid: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { uuid } })
  }
}
