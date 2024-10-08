import { Avatar } from '@components/UI'
import styles from './styles.module.scss'
import classNames from 'classnames'

type TLeaderboardProps = {
  title: string
  time: number
  imagUrl: string
  iconBackgroundClass: 'first' | 'second' | 'third'
}

export const LeadersListItem = ({
  title,
  time,
  imagUrl,
  iconBackgroundClass = 'first',
}: TLeaderboardProps) => {
  function formatTime(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000) // Преобразуем миллисекунды в секунды

    const minutes = Math.floor(totalSeconds / 60) // Вычисляем количество минут и оставшихся секунд
    const seconds = totalSeconds % 60

    return `${minutes} мин. ${seconds} сек.` // Возвращаем форматированную строку
  }
  return (
    <li className={styles.item}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.time}>{formatTime(time)}</p>
      </div>
      <div className={styles.avatarContainer}>
        <Avatar size={'xl'} imgUrl={imagUrl} style={{ position: 'relative' }} />
        <div
          className={classNames(
            `${styles.icon}`,
            `${styles[iconBackgroundClass]}`
          )}
        />
      </div>
    </li>
  )
}
