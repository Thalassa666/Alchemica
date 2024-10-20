import { Request, Response, NextFunction } from 'express'
import { getErrorFromText } from '../utils'

export const checkAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uuid } = req.cookies

  if (!uuid) {
    res.status(403).json(getErrorFromText('Пользователь не авторизован'))
    return
  }

  next()
}
