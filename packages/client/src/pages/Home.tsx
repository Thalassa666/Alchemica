import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUserData } from '@core/store/redusers/auth.reduser'
import { TAppDispatch } from '@core/store/store'

const Home = () => {
  const dispatch = useDispatch<TAppDispatch>()
  useEffect(() => {
    dispatch(getUserData())
  })
  return (
    <div>
      <h1>Главная страница</h1>
      <nav>
        <ul>
          <li>
            <Link to="/Login">Страница логина</Link>
          </li>
          <li>
            <Link to="/register">Страница регистрации</Link>
          </li>
          <li>
            <Link to="/profile">Страница профиля</Link>
          </li>
          <li>
            <Link to="/game">Страница игры</Link>
          </li>
          <li>
            <Link to="/leaderboard">Страница лидерборда</Link>
          </li>
          <li>
            <Link to="/forum">Страница форума</Link>
          </li>
          <li>
            <Link to="/forum/1">
              Страница топика форума (Пример: Topic ID 1)
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Home
