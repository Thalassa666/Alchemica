import { ArrowButton } from '@components/UI'
import { FC } from 'react'
import { TGameCase } from './PlayGame'
import styles from './styles.module.scss'

type TBlockProps = {
  setGameCase: React.Dispatch<React.SetStateAction<TGameCase>>
}

export const LooseGameBlock: FC<TBlockProps> = (props: TBlockProps) => {
  const { setGameCase } = props

  return (
    <>
      <div className={styles.form_loose}>
        <h2>END GAME</h2>
        <p>
          Вы провалили экзамен. Теперь вы будете отрабатывать свое обучение,
          добывая руду в копях Гоблинских пиков или на границе с Заклятым лесом.
          Как знать, что хуже?..
        </p>
        <div>
          <p>Попробовать снова:</p>
          <ArrowButton
            type={'button'}
            handleOnClick={() => setGameCase('loading')}
          />
        </div>
      </div>
    </>
  )
}
