import WithErrorBoundary from '@core/helpers/withErrorBoundary'
import { RequireAuth } from '@core/router/ProtectedRoute'
import AboutGame from '@pages/AboutGame/AboutGame'
import { ChangePass } from '@pages/ChangePass'
import Error from '@pages/Error/Error'
import Forum from '@pages/Forum/Forum'
import Home from '@pages/Home'
import Leaderboard from '@pages/Leaderboard/Leaderboard'
import Login from '@pages/Login'
import PlayGame from '@pages/PlayGame/PlayGame'
import Profile from '@pages/Profile/Profile'
import Register from '@pages/Register'
import Topic from '@pages/Topic'
import errorBookImage from '../../assets/images/icons/error_book.png'
import errorPotionImage from '../../assets/images/icons/error_potion.png'

export const routes = [
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
      {
        path: 'change-pass',
        element: (
          <RequireAuth>
            <ChangePass />
          </RequireAuth>
        ),
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
        <RequireAuth>
          <Forum />
        </RequireAuth>
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
]
