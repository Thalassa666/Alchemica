import { Header } from '@components/header/Header'
import { useAppSelector } from '@core/hooks/useAppSelector'
import {
  getUserData,
  getUserData1,
  loginUserWithYandex,
} from '@core/store/reducers/auth.reducer'
import { TAppDispatch } from '@core/store/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const { isAuth } = useAppSelector(state => state.authReducer)

  const location = useLocation()

  useEffect(() => {
    if (window.location.href.includes('?code')) {
      console.log('yes')
      const redirect_uri = 'http://localhost:3000'
      const data = {
        code: window.location.href.slice(-38, -31),
        redirect_uri: redirect_uri,
        jwt: window.location.href.substr(-26, 26),
      }
      dispatch(loginUserWithYandex(data))
      dispatch(getUserData1(window.location.href.substr(-26, 26)))
    }
  }, [location])

  useEffect(() => {
    if (isAuth) {
      return
    }
    dispatch(getUserData())
  }, [isAuth])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Home
