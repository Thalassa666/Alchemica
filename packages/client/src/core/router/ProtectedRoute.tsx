import { useAppSelector } from '@core/hooks/useAppSelector'
import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAppSelector(state => state.authReducer)

  const location = useLocation()
  if (!isAuth) {
    return <Navigate to={'/login'} state={{ from: location }} replace />
  }

  return <>{children}</>
}
