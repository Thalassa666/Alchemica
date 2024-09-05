import AboutGame from '@pages/AboutGame/AboutGame'
import Error from '@pages/Error'
import Forum from '@pages/Forum'
import Home from '@pages/Home'
import Leaderboard from '@pages/Leaderboard/Leaderboard'
import Login from '@pages/Login'
import PlayGame from '@pages/PlayGame/PlayGame'
import Profile from '@pages/Profile'
import Register from '@pages/Register'
import Topic from '@pages/Topic'
import WithErrorBoundary from '../helpers/withErrorBoundary'
import { createBrowserRouter } from 'react-router-dom'
import errorBookImage from '../../assets/images/error_book.png'
import errorPotionImage from '../../assets/images/error_potion.png'
import { RequireAuth } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <WithErrorBoundary>
        <Home />
      </WithErrorBoundary>
    ),
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
        <Register />
      </WithErrorBoundary>
    ),
  },
  {
    path: '/profile',
    element: (
      <WithErrorBoundary>
        <RequireAuth>
          <Profile />
        </RequireAuth>
      </WithErrorBoundary>
    ),
  },
  {
    path: '/about',
    element: (
      <WithErrorBoundary>
        <AboutGame />
      </WithErrorBoundary>
    ),
  },
  {
    path: '/game',
    element: (
      <WithErrorBoundary>
        <RequireAuth>
          <PlayGame />
        </RequireAuth>
      </WithErrorBoundary>
    ),
  },
  {
    path: '/leaderboard',
    element: (
      <WithErrorBoundary>
        <Leaderboard />
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
        element: (
          <WithErrorBoundary>
            <Topic />
          </WithErrorBoundary>
        ),
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
