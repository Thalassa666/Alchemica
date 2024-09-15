import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'

type TLayoutProps = {
  children: ReactNode
  gameCase?: string
}

const getClassName = (gameCase: string | undefined) => {
  switch (gameCase) {
    case 'start':
    case 'loading':
      return styles.background
    case 'win':
      return styles.background_win
    case 'loose':
      return styles.background_loose
    default:
      return undefined
  }
}

export const Layout: FC<TLayoutProps> = (props: TLayoutProps) => {
  const { gameCase } = props

  return (
    <section className={styles.layout}>
      <div className={getClassName(gameCase)}>
        <div className={styles.titleOverlay}></div>
        {props.children}
      </div>
    </section>
  )
}
