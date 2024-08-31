import { ArrowButton } from '@components/UI'
import { FC, MouseEvent, useState } from 'react'
import styles from './styles.module.scss'

type TBlockProps = {
  setGameCase: (a: string) => void
}

export const StartButtonBlock: FC<TBlockProps> = (props: TBlockProps) => {
  const { setGameCase } = props

  return (
    <>
      <div className={styles.form}>
        <h2>START GAME</h2>
        <ArrowButton
          type={'button'}
          handleOnClick={() => setGameCase('loading')}
        />
      </div>
    </>
  )
}
