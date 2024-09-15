import { ArrowButton } from '@components/UI'
import { GameStatistic } from '@game/types/types'
import { FC } from 'react'
import { ResultStatistic } from './ResultStatistic'
import styles from './styles.module.scss'

type TBlockProps = {
  gameStatistic: GameStatistic | null
  setGameCase: (a: string) => void
}

export const LooseGameBlock: FC<TBlockProps> = (props: TBlockProps) => {
  const { gameStatistic, setGameCase } = props

  return (
    <>
      <div className={styles.form_loose}>
        <h2>END GAME</h2>
        <p>
          Вы провалили экзамен. Теперь вы будете отрабатывать свое обучение,
          добывая руду в копях Гоблинских пиков или на границе с Заклятым лесом.
          Как знать, что хуже?..
        </p>

        {gameStatistic && <ResultStatistic gameStatistic={gameStatistic} />}

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
