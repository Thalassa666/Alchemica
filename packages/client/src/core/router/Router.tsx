import Home from '@pages/Home'
import Login from '@pages/Login'
import Register from '@pages/Register'
import Profile from '@pages/Profile'
import Game from '@pages/Game'
import Leaderboard from '@pages/Leaderboard'
import Forum from '@pages/Forum'
import Topic from '@pages/Topic'
import Error from '@pages/Error'
import { createBrowserRouter } from 'react-router-dom'
import { RequireAuth } from '@core/router/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/profile',
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
  },
  {
    path: '/game',
    element: (
      <RequireAuth>
        <Game />
      </RequireAuth>
    ),
  },
  {
    path: '/leaderboard',
    element: (
      <RequireAuth>
        <Leaderboard />
      </RequireAuth>
    ),
  },
  {
    path: '/forum',
    element: (
      <RequireAuth>
        <Forum />
      </RequireAuth>
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
    element: <Error />,
  },
])
