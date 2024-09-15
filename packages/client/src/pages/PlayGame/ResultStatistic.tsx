import { GameStatistic } from '@game/types/types'
import styles from './styles.module.scss'

type Props = {
  gameStatistic: GameStatistic
}

const getTotalTime = (start: number | null, end: number | null) => {
  if (!start || !end) {
    return null
  }

  const ms = end - start
  const sec = ms / 1000
  const min = sec / 60

  const formatter = new Intl.NumberFormat('ru-ru', { maximumFractionDigits: 2 })

  return `${formatter.format(min)} мин.`
}

export const ResultStatistic = (props: Props) => {
  const { gameStatistic } = props
  const { totalScore, startedAt, endedAt } = gameStatistic

  const totalTime = getTotalTime(startedAt, endedAt)

  return (
    <div className={styles.resultStatistic}>
      <p>Ваш счёт: {totalScore}</p>
      {totalTime && <p>Вы справились за: {totalTime}</p>}
    </div>
  )
}
