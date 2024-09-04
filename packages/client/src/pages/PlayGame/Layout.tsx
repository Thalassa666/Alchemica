import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'

type TLayoutProps = {
  children: ReactNode
  gameCase: string
}
export interface IProps {
  [key: string]: unknown
}

export const Layout: FC<TLayoutProps> = (props: TLayoutProps) => {
  const { gameCase } = props
  const obj = {
    start: styles.background as CSSModuleClasses[string],
    loading: styles.background as CSSModuleClasses[string],
    win: styles.background_win as CSSModuleClasses[string],
    loose: styles.background_loose as CSSModuleClasses[string],
  }

  const background = obj[gameCase as keyof typeof obj]

  return (
    <section className={styles.layout}>
      <div className={background}>
        <div className={styles.titleOverlay}></div>
        {props.children}
      </div>
    </section>
  )
}
