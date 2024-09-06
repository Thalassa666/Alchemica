import { useEffect } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const Header = () => {
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

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div>
          <div className={styles.music}></div>
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
