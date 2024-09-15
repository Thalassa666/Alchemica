import { ReactNode } from 'react'
import styles from './styles.module.scss'

type TLayoutProps = {
  children: ReactNode
  backgroundClass: 'loginBg' | 'profileBg'
  isTitleShow: boolean
}

export const Layout = (props: TLayoutProps) => {
  const { children, backgroundClass, isTitleShow } = props
  return (
    <section className={styles.layout}>
      <div className={styles.background}>{props.children}</div>
    </section>
  )
}

export const FormsLayout = (props: TLayoutProps) => {
  const { children, backgroundClass, isTitleShow } = props
  return (
    <section className={styles.profileLayout}>
      <div className={styles.backgroundProfile}>{props.children}</div>
    </section>
  )
}
