import { ReactNode } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'

type TLayoutProps = {
  children: ReactNode
  backgroundClass: 'loginBg' | 'profileBg'
}

export const Layout = (props: TLayoutProps) => {
  const { children, backgroundClass } = props
  return (
    <section className={styles.layout}>
      <div
        className={classNames(
          `${styles.background}`,
          `${styles[backgroundClass]}`
        )}
      >
        {backgroundClass === 'profileBg' ? (
          <></>
        ) : (
          <div className={styles.titleOverlay}>
            <h1>ALCHEMIST</h1>
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
