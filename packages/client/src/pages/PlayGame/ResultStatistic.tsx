import { getFormattedDiff } from '@core/helpers'
import { GameStatistic } from '@game/types/types'
import styles from './styles.module.scss'

type Props = {
  gameStatistic: GameStatistic
}

export const ResultStatistic = (props: Props) => {
  const { gameStatistic } = props
  const { totalScore, startedAt, endedAt } = gameStatistic

  const totalTime = getFormattedDiff(startedAt, endedAt)

  return (
    <div className={styles.resultStatistic}>
      <p>Ваш счёт: {totalScore}</p>
      {totalTime && <p>Вы справились за: {totalTime}</p>}
    </div>
  )
}
