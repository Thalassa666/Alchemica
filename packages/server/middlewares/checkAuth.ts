import { Request, Response, NextFunction } from 'express'
import { ApiRoute } from '../router/names'
import { getErrorFromText } from '../utils'

const publicRoutes = [ApiRoute.Main, ApiRoute.SignIn, ApiRoute.SignUp]

const checkIsPublic = (pathname: string): boolean => {
  const clearPath = (path: string) => {
    return path.trim().replace(/\//g, '')
  }

  return publicRoutes.some(route => clearPath(route) === clearPath(pathname))
}

export const checkAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uuid } = req.cookies

  if (!checkIsPublic(req.originalUrl) && !uuid) {
    res.status(403).json(getErrorFromText('Пользователь не авторизован'))
    return
  }

  next()
}
