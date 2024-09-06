import styles from './styles.module.scss'

type TButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined
  handleOnClick?: () => void
}
export const ArrowButton = ({ type, handleOnClick }: TButtonProps) => {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={handleOnClick}
    ></button>
  )
}
