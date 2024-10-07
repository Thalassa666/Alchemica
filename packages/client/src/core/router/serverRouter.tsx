import Home, { initHomePage } from '@pages/Home'
import Profile from '@pages/Profile/Profile'
import AboutGame from '@pages/AboutGame/AboutGame'
import { ChangePass } from '@pages/ChangePass'
import Forum from '@pages/Forum/Forum'
import PlayGame from '@pages/PlayGame/PlayGame'
import Leaderboard from '@pages/Leaderboard/Leaderboard'
import Login from '@pages/Login'
import Register from '@pages/Register'
import Topic from '@pages/Topic'
import Error from '@pages/Error/Error'
import errorBookImage from '../../assets/images/icons/error_book.png'
import errorPotionImage from '../../assets/images/icons/error_potion.png'

export const serverRoutes = [
  {
    path: '/',
    Component: Home,
    fetchData: initHomePage,
  },
  {
    path: '/profile',
    Component: Profile,
  },
  {
    path: '/about',
    Component: AboutGame,
  },
  {
    path: '/game',
    Component: PlayGame,
  },
  {
    path: '/leaderboard',
    Component: Leaderboard,
  },
  {
    path: '/change-pass',
    Component: ChangePass,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/forum',
    Component: Forum,
    children: [
      {
        path: ':topicId',
        Component: Topic,
      },
    ],
  },
  {
    path: '*',
    Component: () => (
      <Error
        errorCode={404}
        errorMessage="Такой страницы у нас нет :-("
        errorPicture={errorBookImage}
      />
    ),
  },
  {
    path: '/500',
    Component: () => (
      <Error
        errorCode={500}
        errorMessage="Упс, что-то сломалось :-("
        errorPicture={errorPotionImage}
      />
    ),
  },
]
