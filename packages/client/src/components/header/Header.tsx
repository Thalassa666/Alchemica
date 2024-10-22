import { useAppSelector } from '@core/hooks/useAppSelector'
import { soundActions } from '@core/store/reducers/sound.reducer'
import { TAppDispatch } from '@core/store/store'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'

export const Header = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const location = useLocation()
  const { soundOn } = useAppSelector(state => state.soundReducer)
  const [theme, setTheme] = useState('Dark')

  const onMusicClick = () => {
    dispatch(soundActions.switchSound())
  }

  const toggleTheme = () => {
    if (theme === 'Light') {
      localStorage.setItem('theme', 'Dark')
      setTheme('Dark')
      document.documentElement.style.setProperty(
        '--background-color',
        '#131010'
      )
      document.documentElement.style.setProperty(
        '--color-background',
        'rgba(0, 0, 0, 0.7)'
      )
    }
    if (theme === 'Dark') {
      localStorage.setItem('theme', 'Light')
      setTheme('Light')
      document.documentElement.style.setProperty(
        '--background-color',
        '#615f53'
      )
      document.documentElement.style.setProperty(
        '--color-background',
        'rgb(41 39 39 / 70%)'
      )
    }
  }

  useEffect(() => {
    if (localStorage.getItem('theme') === 'Light') {
      setTheme('Light')
      document.documentElement.style.setProperty(
        '--background-color',
        '#615f53'
      )
      document.documentElement.style.setProperty(
        '--color-background',
        'rgb(41 39 39 / 70%)'
      )
    }
    if (localStorage.getItem('theme') === 'Dark') {
      setTheme('Dark')
      document.documentElement.style.setProperty(
        '--background-color',
        '#131010'
      )
      document.documentElement.style.setProperty(
        '--color-background',
        'rgba(0, 0, 0, 0.7)'
      )
    }
  }, [])

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div>
          <button
            className={classNames(styles.music, !soundOn && styles.music_off)}
            onClick={onMusicClick}
          ></button>
          <Link
            className={classNames(
              styles.link,
              location.pathname === '/game' ? styles.active : ''
            )}
            to={'/game'}
          >
            Играть
          </Link>
        </div>
        <Link
          to={'/leaderboard'}
          className={classNames(
            styles.link,
            location.pathname === '/leaderboard' ? styles.active : ''
          )}
        >
          Рекорды
        </Link>
        <Link
          to={'/about'}
          className={classNames(
            styles.link,
            location.pathname === '/about' ? styles.active : ''
          )}
        >
          Об игре
        </Link>
        <Link
          to={'/forum'}
          className={classNames(
            styles.link,
            location.pathname === '/forum' ? styles.active : ''
          )}
        >
          Форум
        </Link>
        <div>
          <Link
            to={'/profile'}
            className={classNames(
              styles.link,
              location.pathname === '/profile' ? styles.active : ''
            )}
          >
            Профиль
          </Link>
          <button
            className={classNames(
              styles.toggle,
              theme === 'Dark' ? styles.dark : styles.light
            )}
            onClick={toggleTheme}
          ></button>
        </div>
      </nav>
    </header>
  )
}
