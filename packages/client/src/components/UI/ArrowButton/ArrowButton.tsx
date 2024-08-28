import styles from './styles.module.scss'

type TButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined
}
export const ArrowButton = ({ type }: TButtonProps) => {
  return <button type={type} className={styles.button}></button>
}
