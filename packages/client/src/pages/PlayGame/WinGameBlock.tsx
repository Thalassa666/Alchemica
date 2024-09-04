import { ArrowButton } from '@components/UI'
import { FC } from 'react'
import styles from './styles.module.scss'

type TBlockProps = {
  setGameCase: (a: string) => void
}

export const WinGameBlock: FC<TBlockProps> = (props: TBlockProps) => {
  const { setGameCase } = props

  return (
    <>
      <div className={styles.form_win}>
        <h2>GAME END</h2>
        <p>Поздравляем!</p>
        <p>
          Вы сдали экзамен и получили диплом Королевской академии алхимии и
          траволечения. Новая жизнь, полная комфорта и приключений, ждет вас!..
        </p>
        <hr></hr>
        <p>Над игрой работали:</p>
        <p>Thalassa666</p>
        <p>Gyxer513</p>
        <p>ranelgm</p>
        <p>krokodila888</p>
        <div>
          <p>Сыграть снова?</p>
          <ArrowButton
            type={'button'}
            handleOnClick={() => setGameCase('loading')}
          />
        </div>
      </div>
    </>
  )
}