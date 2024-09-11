import styles from './styles.module.scss'
import { ReactNode } from 'react'

type TLeaderboardLayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: TLeaderboardLayoutProps) => {
  return (
    <section className={styles.layout}>
      <div className={styles.background}>
        <div className={styles.titleOverlay}></div>
        {children}
      </div>
    </section>
  )
}
