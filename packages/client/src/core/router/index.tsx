import AboutGame from '@pages/AboutGame/AboutGame'
import Error from '@pages/Error'
import Forum from '@pages/Forum'
import Home from '@pages/Home'
import Leaderboard from '@pages/Leaderboard'
import Login from '@pages/Login'
import PlayGame from '@pages/PlayGame/PlayGame'
import Profile from '@pages/Profile'
import Register from '@pages/Register'
import Topic from '@pages/Topic'
import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter } from 'react-router-dom'
import errorBookImage from '../../assets/images/error_book.png'
import errorPotionImage from '../../assets/images/error_potion.png'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary
        fallbackRender={() => (
          <Error
            errorCode={500}
            errorMessage="Упс, что-то сломалось :-("
            errorPicture={errorPotionImage}
          />
        )}
      >
        <Home />
      </ErrorBoundary>
    ),
  },
  {
    path: '/login',
    element: (
      <ErrorBoundary
        fallbackRender={() => (
          <Error
            errorCode={500}
            errorMessage="Упс, что-то сломалось :-("
            errorPicture={errorPotionImage}
          />
        )}
      >
        <Login />
      </ErrorBoundary>
    ),
  },
  {
    path: '/register',
    element: (
      <ErrorBoundary
        fallbackRender={() => (
          <Error
            errorCode={500}
            errorMessage="Упс, что-то сломалось :-("
            errorPicture={errorPotionImage}
          />
        )}
      >
        <Register />
      </ErrorBoundary>
    ),
  },
  {
    path: '/profile',
    element: (
      <ErrorBoundary
        fallbackRender={() => (
          <Error
            errorCode={500}
            errorMessage="Упс, что-то сломалось :-("
            errorPicture={errorPotionImage}
          />
        )}
      >
        <Profile />
      </ErrorBoundary>
    ),
  },
  {
    path: '/about',
    element: (
      <ErrorBoundary
        fallbackRender={() => (
          <Error
            errorCode={500}
            errorMessage="Упс, что-то сломалось :-("
            errorPicture={errorPotionImage}
          />
        )}
      >
        <AboutGame />
      </ErrorBoundary>
    ),
  },
  {
    path: '/game',
    element: (
      <ErrorBoundary
        fallbackRender={() => (
          <Error
            errorCode={500}
            errorMessage="Упс, что-то сломалось :-("
            errorPicture={errorPotionImage}
          />
        )}
      >
        <PlayGame />
      </ErrorBoundary>
    ),
  },
  {
    path: '/leaderboard',
    element: (
      <ErrorBoundary
        fallbackRender={() => (
          <Error
            errorCode={500}
            errorMessage="Упс, что-то сломалось :-("
            errorPicture={errorPotionImage}
          />
        )}
      >
        <Leaderboard />
      </ErrorBoundary>
    ),
  },
  {
    path: '/forum',
    element: (
      <ErrorBoundary
        fallbackRender={() => (
          <Error
            errorCode={500}
            errorMessage="Упс, что-то сломалось :-("
            errorPicture={errorPotionImage}
          />
        )}
      >
        <Forum />
      </ErrorBoundary>
    ),
    children: [
      {
        path: ':topicId',
        element: (
          <ErrorBoundary
            fallbackRender={() => (
              <Error
                errorCode={500}
                errorMessage="Упс, что-то сломалось :-("
                errorPicture={errorPotionImage}
              />
            )}
          >
            <Topic />
          </ErrorBoundary>
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
