import { ArrowButton } from '@components/UI'
import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Preloader } from '@components/preloader/Preloader'
import { facts } from './constants/constants'

type TBlockProps = {
  setGameCase: (a: string) => void
}

export const PreloaderBlock: FC<TBlockProps> = (props: TBlockProps) => {
  const { setGameCase } = props
  const [currentFact, setCurrentFact] = useState(
    'На алхимическом рынке часто выдают звериную шерсть за шерсть лютоволка. Будьте внимательнее!'
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact(facts[Math.floor(Math.random() * (facts.length - 1))])
    }, 12000)
    return () => clearInterval(timer)
  }, [currentFact])

  return (
    <>
      <div className={styles.form_preloader}>
        <h2>Loading...</h2>
        <div>
          <Preloader />
        </div>
        <p>{currentFact}</p>
        <div>
          <p>На случай провала:</p>
          <ArrowButton
            type={'button'}
            handleOnClick={() => setGameCase('loose')}
          />
        </div>
        <div>
          <p>На случай победы:</p>
          <ArrowButton
            type={'button'}
            handleOnClick={() => setGameCase('win')}
          />
        </div>
      </div>
    </>
  )
}
