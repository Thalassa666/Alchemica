import styles from './styles.module.scss'

type TButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined
  handleOnClick?: () => void
  disabled?: boolean
}
export const ArrowButton = ({
  type,
  handleOnClick,
  disabled,
}: TButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={styles.button}
      onClick={handleOnClick}
    ></button>
  )
}
