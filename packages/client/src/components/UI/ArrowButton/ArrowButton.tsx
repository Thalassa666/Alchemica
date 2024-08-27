import styles from './styles.module.scss'

type TButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined
}
export const ArrowButton = () => {
  return <button className={styles.button}></button>

}
