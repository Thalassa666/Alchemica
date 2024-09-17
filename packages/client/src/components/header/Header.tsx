import { useAppSelector } from '@core/hooks/useAppSelector'
import { soundActions } from '@core/store/reducers/sound.reducer'
import { TAppDispatch } from '@core/store/store'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export const Header = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const location = useLocation()
  const { soundOn } = useAppSelector(state => state.soundReducer)

  const onMusicClick = () => {
    dispatch(soundActions.switchSound())
  }

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
        <Link
          to={'/profile'}
          className={classNames(
            styles.link,
            location.pathname === '/profile' ? styles.active : ''
          )}
        >
          Профиль
        </Link>
      </nav>
    </header>
  )
}
