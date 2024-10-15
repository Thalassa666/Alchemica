import { Header } from '@components/header/Header'
import { PageInitArgs, usePage } from '@core/hooks/usePage'
import { getUserData } from '@core/store/reducers/auth.reducer'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Home = () => {
  usePage({
    initPage: async ({ dispatch }: PageInitArgs) => {
      await dispatch(getUserData())
    },
  })

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Главная</title>
        <meta name="description" content="Home page" />
      </Helmet>
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
