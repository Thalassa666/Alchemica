import React, { ReactNode } from 'react'
import styles from './styles.module.scss'

type TLayoutProps = {
  children: ReactNode
}

export const Layout = (props: TLayoutProps) => {
  return (
    <section className={styles.layout}>
      <div className={styles.background}>{props.children}</div>
    </section>
  )
}
