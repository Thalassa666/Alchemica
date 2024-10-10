import { Header } from '@components/header/Header'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '@core/hooks/useAppSelector'
import { getUserData } from '@core/store/reducers/auth.reducer'
import { PageInitArgs, usePage } from '@core/hooks/usePage'

const Home = () => {
  usePage({
    initPage: async ({ dispatch }: PageInitArgs) => {
      await dispatch(getUserData())
    },
  })

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

// Функция для инициализации на серверной стороне
export const initHomePage = async ({ dispatch }: PageInitArgs) => {
  await dispatch(getUserData())
}

export default Home
