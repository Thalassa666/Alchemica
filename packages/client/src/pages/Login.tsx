import { FormsLayout, LoginForm } from '@components/forms'
import { useEffect } from 'react'
import { useAppSelector } from '@core/hooks'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const { isAuth } = useAppSelector(state => state.authReducer)

  if (!isAuth) {
    return <Navigate to={'/game'} replace />
  }
  return (
    <>
      <div>
        <FormsLayout backgroundClass={'loginBg'}>
          <LoginForm />
        </FormsLayout>
      </div>
    </>
  )
}

export default Login
