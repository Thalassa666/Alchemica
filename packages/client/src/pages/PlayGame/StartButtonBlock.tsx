import { ArrowButton } from '@components/UI'
import { FC } from 'react'
import { TGameCase } from './PlayGame'
import styles from './styles.module.scss'

type TBlockProps = {
  setGameCase: React.Dispatch<React.SetStateAction<TGameCase>>
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
