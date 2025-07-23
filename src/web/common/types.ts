// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NextFunction = (err?: any) => void

export type ControllerAction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<Response | void>
