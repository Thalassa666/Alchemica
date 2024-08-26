import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import './App.css'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Game from './pages/Game'
import Leaderboard from './pages/Leaderboard'
import Forum from './pages/Forum'
import Topic from './pages/Topic'
import Error from './pages/Error'

const AppRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'profile',
      element: <Profile />,
    },
    {
      path: 'game',
      element: <Game />,
    },
    {
      path: 'leaderboard',
      element: <Leaderboard />,
    },
    {
      path: 'forum',
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
}

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
