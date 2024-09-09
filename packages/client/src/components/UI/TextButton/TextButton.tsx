import styles from './styles.module.scss'

type TTextButtonProps = {
  text: string
  onClick?: () => void
}

export const TextButton = ({ text, onClick }: TTextButtonProps) => {
  return (
    <button className={styles.textButton} onClick={onClick}>
      {text}
    </button>
  )
}
