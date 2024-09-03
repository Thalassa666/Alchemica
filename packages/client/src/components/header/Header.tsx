import { useEffect } from 'react'
import styles from './styles.module.scss'

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
          <a href={'/game'} className={styles.link}>
            Играть
          </a>
        </div>
        <a href={'/leaderboard'} className={styles.link}>
          Рекорды
        </a>
        <a href={'/about'} className={styles.link}>
          Об игре
        </a>
        <a href={'/forum'} className={styles.link}>
          Форум
        </a>
        <a href={'/profile'} className={styles.link}>
          Профиль
        </a>
      </nav>
    </header>
  )
}
