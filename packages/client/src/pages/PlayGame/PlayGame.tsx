import { Header } from '@components/header/Header'
import { useState } from 'react'
import { Layout } from './Layout'
import { LooseGameBlock } from './LooseGameBlock'
import { PreloaderBlock } from './PreloaderBlock'
import { StartButtonBlock } from './StartButtonBlock'
import { WinGameBlock } from './WinGameBlock'

export type TGameCase = 'start' | 'loading' | 'win' | 'loose'

const PlayGame = () => {
  const [gameCase, setGameCase] = useState<TGameCase>('start')

  const obj = {
    start: <StartButtonBlock setGameCase={setGameCase} />,
    loading: <PreloaderBlock setGameCase={setGameCase} />,
    win: <WinGameBlock setGameCase={setGameCase} />,
    loose: <LooseGameBlock setGameCase={setGameCase} />,
  }

  const component = obj[gameCase as keyof typeof obj]

  return (
    <>
      <div>
        <Layout
          gameCase={gameCase}
          children={
            <>
              <Header />
              {component}
            </>
          }
        />
      </div>
    </>
  )
}

export default PlayGame
