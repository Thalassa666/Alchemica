import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Главная страница</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">Страница логина</Link>
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
            <Link to="/about">Лендинг игры</Link>
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
          <li>
            <Link to="/500">Error 500</Link>
          </li>
          <li>
            <Link to="/qw">Error 404</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Home
