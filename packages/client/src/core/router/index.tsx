import AboutGame from '@pages/AboutGame/AboutGame'
import Error from '@pages/Error'
import Forum from '@pages/Forum'
import Home from '@pages/Home'
import Leaderboard from '@pages/Leaderboard/Leaderboard'
import Login from '@pages/Login'
import PlayGame from '@pages/PlayGame/PlayGame'
import Profile from '@pages/Profile/Profile'
import Register from '@pages/Register'
import Topic from '@pages/Topic'
import { createBrowserRouter } from 'react-router-dom'
import errorBookImage from '../../assets/images/error_book.png'
import errorPotionImage from '../../assets/images/error_potion.png'
import WithErrorBoundary from '@core/helpers/withErrorBoundary'
import { RequireAuth } from '@core/router/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <WithErrorBoundary>
        <Home />
      </WithErrorBoundary>
    ),
    children: [
      {
        path: 'profile',
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
      {
        path: 'about',
        element: <AboutGame />,
      },
      {
        path: 'game',
        element: (
          <RequireAuth>
            <PlayGame />
          </RequireAuth>
        ),
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <WithErrorBoundary>
        <Login />
      </WithErrorBoundary>
    ),
  },
  {
    path: '/register',
    element: (
      <WithErrorBoundary>
        <Register />,
      </WithErrorBoundary>
    ),
  },
  {
    path: '/forum',
    element: (
      <WithErrorBoundary>
        <Forum />
      </WithErrorBoundary>
    ),
    children: [
      {
        path: ':topicId',
        element: <Topic />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <Error
        errorCode={404}
        errorMessage="Такой страницы у нас нет :-("
        errorPicture={errorBookImage}
      />
    ),
  },
  {
    path: '/500',
    element: (
      <Error
        errorCode={500}
        errorMessage="Упс, что-то сломалось :-("
        errorPicture={errorPotionImage}
      />
    ),
  },
])
