import { Express } from 'express'
import { UserRoutes } from './user_routes'

export function buildRoutes(app: Express): Express {
  app.use(UserRoutes.router)

  return app
}
