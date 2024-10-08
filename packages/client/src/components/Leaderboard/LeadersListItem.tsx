import FallbackImage from '@assets/images/character/character-go-left.png'
import { getFormattedDiff } from '@core/helpers'
import { BASE_URL } from '@core/utils/constants'
import { ILeaderboardResult } from '@core/utils/interfaces/Leaderboard'
import { Avatar } from '@gravity-ui/uikit'
import classNames from 'classnames'
import styles from './styles.module.scss'

type TLeaderboardProps = {
  data: ILeaderboardResult
}

type RangValue = { name: string; value: number }

const rangConfig: Record<string, RangValue> = {
  first: { name: 'Успешно сдавший', value: 0 },
  second: { name: 'Диплом с отличием', value: 6_000 },
  third: { name: 'Почетный выпускник', value: 8_000 },
  fourth: { name: 'Гордость академии', value: 10_000 },
}

const getRang = (score: number) => {
  const [firstEntry, ...restEntries] = Object.entries(rangConfig)
  const [level, rangValue] = firstEntry
  let result = { level, ...rangValue }

  restEntries.forEach(([entryRang, entryValue]) => {
    if (entryValue.value > result.value && entryValue.value < score) {
      result = { level: entryRang, ...entryValue }
    }
  })

  return result
}

export const LeadersListItem = ({ data }: TLeaderboardProps) => {
  const { alchemyGameScore, startedAt, endedAt, user } = data

  const formattedTime = getFormattedDiff(startedAt, endedAt)
  const rang = getRang(alchemyGameScore)
  const avatarUrl = user.avatar
    ? `${BASE_URL}/resources/${user.avatar}`
    : FallbackImage
  const name = `${user.first_name} ${user.second_name} (${user.login})`

  return (
    <li className={styles.item}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.rangName}>{rang.name}</p>

        <div className={styles.scoreWrapper}>
          <p className={styles.score}>Счёт: {alchemyGameScore}</p>
          <p className={styles.time}>Время: {formattedTime}</p>
        </div>
      </div>

      <div className={styles.avatarContainer}>
        <Avatar
          size={'xl'}
          imgUrl={avatarUrl}
          style={{ position: 'relative' }}
        />

        <div
          className={classNames(
            `${styles.icon}`,
            styles[`skill__${rang.level}`]
          )}
        />
      </div>
    </li>
  )
}
