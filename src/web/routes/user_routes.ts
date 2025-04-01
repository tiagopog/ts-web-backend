import { Application, Router } from 'express'
import { UserController } from '../controllers'

export class UserRoutes {
  static router = Router()

  static apiV1 = '/api/v1'

  static createUser = `${this.apiV1}/users`
  static showUser = `${this.apiV1}/users/:id`
  static updateUser = `${this.apiV1}/users/:id`
}

UserRoutes.router.get(UserRoutes.showUser, UserController.show as Application)
UserRoutes.router.post(UserRoutes.createUser, UserController.create as Application)
