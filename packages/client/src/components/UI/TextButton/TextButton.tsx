import styles from './styles.module.scss'

type TTextButtonProps = {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
}

export const TextButton = ({
  text,
  onClick,
  type = 'button',
}: TTextButtonProps) => {
  return (
    <button type={type} className={styles.textButton} onClick={onClick}>
      {text}
    </button>
  )
}
