import { ArrowButton } from '@components/UI'
import { GameStatistic } from '@game/types/types'
import { FC } from 'react'
import { ResultStatistic } from './ResultStatistic'
import styles from './styles.module.scss'

type TBlockProps = {
  gameStatistic: GameStatistic | null
  setGameCase: (a: string) => void
}

export const WinGameBlock: FC<TBlockProps> = (props: TBlockProps) => {
  const { gameStatistic, setGameCase } = props

  return (
    <>
      <div className={styles.form_win}>
        <h2>GAME END</h2>
        <p>Поздравляем!</p>
        <p>
          Вы сдали экзамен и получили диплом Королевской академии алхимии и
          траволечения. Новая жизнь, полная комфорта и приключений, ждет вас!..
        </p>

        {gameStatistic && <ResultStatistic gameStatistic={gameStatistic} />}

        <hr></hr>
        <p>Над игрой работали:</p>
        <p>Thalassa666</p>
        <p>Gyxer513</p>
        <p>ranelgm</p>
        <p>krokodila888</p>
        <div>
          <p>Сыграть снова?</p>
          <ArrowButton
            type={'button'}
            handleOnClick={() => setGameCase('loading')}
          />
        </div>
      </div>
    </>
  )
}
