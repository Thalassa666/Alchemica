import { Header } from '@components/header/Header'
import { Layout } from './Layout'
import { StartButtonBlock } from './StartButtonBlock'
import { PreloaderBlock } from './PreloaderBlock'
import { LooseGameBlock } from './LooseGameBlock'
import { WinGameBlock } from './WinGameBlock'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const PlayGame = () => {
  const [gameCase, setGameCase] = useState('start')

  return (
    <>
      <div>
        <Layout
          gameCase={gameCase}
          children={
            <>
              {gameCase === 'start' && (
                <StartButtonBlock setGameCase={setGameCase} />
              )}
              {gameCase === 'loading' && (
                <PreloaderBlock setGameCase={setGameCase} />
              )}
              {gameCase === 'win' && <WinGameBlock setGameCase={setGameCase} />}
              {gameCase === 'loose' && (
                <LooseGameBlock setGameCase={setGameCase} />
              )}
              <Outlet />
            </>
          }
        />
      </div>
    </>
  )
}

export default PlayGame
