import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'

type TLayoutProps = {
  children: ReactNode
  gameCase?: string
}

export const Layout: FC<TLayoutProps> = (props: TLayoutProps) => {
  const { gameCase } = props

  return (
    <section className={styles.layout}>
      <div
        className={
          gameCase === 'start'
            ? styles.background
            : gameCase === 'loading'
            ? styles.background
            : gameCase === 'win'
            ? styles.background_win
            : styles.background_loose
        }>
        <div className={styles.titleOverlay}></div>
        {props.children}
      </div>
    </section>
  )
}
