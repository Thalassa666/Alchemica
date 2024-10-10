import styles from './styles.module.scss'

type TButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined
  handleOnClick?: () => void
  disabled?: boolean
  'data-testid'?: string
}
export const ArrowButton = ({
  type,
  handleOnClick,
  disabled,
  'data-testid': testId,
}: TButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={styles.button}
      onClick={handleOnClick}
      data-testid={testId}
    ></button>
  )
}
