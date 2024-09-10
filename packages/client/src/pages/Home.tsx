import { Header } from '@components/header/Header'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppSelector } from '@core/hooks/useAppSelector'
import { TAppDispatch } from '@core/store/store'
import { useDispatch } from 'react-redux'
import { getUserData } from '@core/store/reducers/auth.reducer'

const Home = () => {
  const dispatch = useDispatch<TAppDispatch>()

  useEffect(() => {
    dispatch(getUserData())
  })

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Home
