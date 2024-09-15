import { GameControls } from '@game/constants/misc'
import styles from './styles.module.scss'

export const ControlsList = () => {
  return (
    <ul className={styles.instructionList}>
      {Object.values(GameControls).map(control => (
        <li key={control.labels.join('')} className={styles.instructionItem}>
          <div className={styles.instructionImages}>
            {control.keyImages.map(img => (
              <img key={img} width={40} height={40} src={img} />
            ))}
          </div>
          <p className={styles.instructionLabel}>
            {control.labels.join(' / ')}
          </p>
        </li>
      ))}
    </ul>
  )
}
