import Error from '@pages/Error'
import Forum from '@pages/Forum'
import Game from '@pages/Game'
import Home from '@pages/Home'
import Leaderboard from '@pages/Leaderboard'
import Login from '@pages/Login'
import Profile from '@pages/Profile'
import Register from '@pages/Register'
import Topic from '@pages/Topic'
import { createBrowserRouter } from 'react-router-dom'

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
    element: <Profile />,
  },
  {
    path: '/game',
    element: <Game />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '/forum',
    element: <Forum />,
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
