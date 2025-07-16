import { Express, NextFunction, Request, Response } from 'express'
import { ErrorCodes, JsonApiError } from '../errors'

export const DEFAULT_ERROR_STATUS = 400
export const DEFAULT_ERROR_CODE = ErrorCodes.APPLICATION_ERROR
export const DEFAULT_ERROR_MSG = 'Something went wrong'

export function handlerError(app: Express): Express {
  app.use(jsonApiErrorHandler)
  return app
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function jsonApiErrorHandler(errors: any, req: Request, res: Response, next: NextFunction) {
  // Error handling must be delegated to the default Express error handler,
  // when the headers have already been sent to the client.
  if (res.headersSent) return next(errors)

  errors = Array.isArray(errors) ? errors : [errors]
  errors = formatJsonApiErrors(errors)
  const status = Number(errors[0]?.status) || DEFAULT_ERROR_STATUS

  res.status(status).send({ errors: errors })
}

function formatJsonApiErrors(errors: any[]): JsonApiError[] {
  return errors.map((error) => {
    if (isJsonApiError(error)) return error as JsonApiError

    return {
      status: error.status || DEFAULT_ERROR_STATUS,
      code: error.code || DEFAULT_ERROR_CODE,
      title: error.title || error.message || DEFAULT_ERROR_MSG,
    }
  })
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function isJsonApiError(error: any) {
  return ['status', 'code', 'title'].every((field) => error[field])
}
