import { Header } from '@components/header/Header'
import { useAppSelector } from '@core/hooks/useAppSelector'
import {
  getUserData,
  loginUserWithYandex,
} from '@core/store/reducers/auth.reducer'
import { TAppDispatch } from '@core/store/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useSearchParams } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const { isAuth, isYandexAuth } = useAppSelector(state => state.authReducer)
  const [params] = useSearchParams()

  useEffect(() => {
    const redirect_uri = 'http://localhost:3000'
    const code = params.get('code')
    if (code && isYandexAuth !== 'OK') {
      const data = {
        code: code,
        redirect_uri: redirect_uri,
      }
      dispatch(loginUserWithYandex(data))
    }
  }, [params])

  useEffect(() => {
    if (isYandexAuth === 'OK') {
      dispatch(getUserData())
    }
  }, [isYandexAuth])

  useEffect(() => {
    if (isAuth && isYandexAuth === 'OK') {
      return
    }
    if (!isAuth && !(isYandexAuth === 'OK')) {
      dispatch(getUserData())
    }
  }, [isAuth])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Home
