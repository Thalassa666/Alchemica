import { ReactNode } from 'react'
import styles from './styles.module.scss'

type TLayoutProps = {
  children: ReactNode
}

export const Layout = (props: TLayoutProps) => {
  return (
    <section className={styles.layout}>
      <div className={styles.background}>
        <div className={styles.titleOverlay}>
          <h1>ALCHEMIST</h1>
        </div>
        {props.children}
      </div>
    </section>
  )
}
