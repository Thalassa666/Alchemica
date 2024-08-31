import Error from '@pages/Error'
import Forum from '@pages/Forum'
import PlayGame from '@pages/PlayGame/PlayGame'
import Home from '@pages/Home'
import Login from '@pages/Login'
import Register from '@pages/Register'
import Profile from '@pages/Profile'
import Leaderboard from '@pages/Leaderboard'
import Topic from '@pages/Topic'
import { createBrowserRouter } from 'react-router-dom'
import styles from './styles.module.scss'
import { FallbackProps } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate()

  const handleReset = () => {
    resetErrorBoundary()
    navigate('/')
  }

  return (
    <div className={styles.error}>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={handleReset}>Try again</button>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Home />
      </ErrorBoundary>
    ),
  },
  {
    path: '/login',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Login />
      </ErrorBoundary>
    ),
  },
  {
    path: '/register',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Register />
      </ErrorBoundary>
    ),
  },
  {
    path: '/profile',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Profile />
      </ErrorBoundary>
    ),
  },
  {
    path: '/game',
    element: <PlayGame />,
  },
  {
    path: '/leaderboard',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Leaderboard />
      </ErrorBoundary>
    ),
  },
  {
    path: '/forum',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Forum />
      </ErrorBoundary>
    ),
    children: [
      {
        path: ':topicId',
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Topic />
          </ErrorBoundary>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Error />
      </ErrorBoundary>
    ),
  },
])
