import { useAppSelector } from '@core/hooks/useAppSelector'
import { soundActions } from '@core/store/reducers/sound.reducer'
import { TAppDispatch } from '@core/store/store'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export const Header = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const { soundOn } = useAppSelector(state => state.soundReducer)

  useEffect(() => {
    const arr = [
      ...(document.getElementsByTagName('a') as unknown as HTMLLinkElement[]),
    ]

    if (arr && arr.length !== 0) {
      arr.forEach(item => {
        if (item.getAttribute('href') === window.location.pathname) {
          item.classList.add(styles.active)
        }
      })
    }
  }, [])

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
          <Link className={styles.link} to={'/game'}>
            Играть
          </Link>
        </div>
        <Link to={'/leaderboard'} className={styles.link}>
          Рекорды
        </Link>
        <Link to={'/about'} className={styles.link}>
          Об игре
        </Link>
        <Link to={'/forum'} className={styles.link}>
          Форум
        </Link>
        <Link to={'/profile'} className={styles.link}>
          Профиль
        </Link>
      </nav>
    </header>
  )
}
