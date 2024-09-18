import { Header } from '@components/header/Header'
import { useAppSelector } from '@core/hooks/useAppSelector'
import { getUserData } from '@core/store/reducers/auth.reducer'
import { TAppDispatch } from '@core/store/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const { isAuth } = useAppSelector(state => state.authReducer)

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
