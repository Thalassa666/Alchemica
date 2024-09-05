import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@core/hooks/useAppSelector'

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAppSelector(state => state.authReducer)
  console.log(isAuth)
  const location = useLocation()

  if (!isAuth) {
    return <Navigate to={'/login'} state={{ from: location }} replace />
  }

  return <>{children}</>
}
