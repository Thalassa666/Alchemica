import { GameClient } from '@game/index'
import { useState } from 'react'
import { Layout } from './Layout'
import { LooseGameBlock } from './LooseGameBlock'
import { PreloaderBlock } from './PreloaderBlock'
import { StartButtonBlock } from './StartButtonBlock'
import { WinGameBlock } from './WinGameBlock'

const PlayGame = () => {
  const [gameCase, setGameCase] = useState('start')

  return (
    <>
      <div>
        <Layout
          gameCase={gameCase}
          children={
            <>
              {gameCase === 'playing' && <GameClient />}
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
            </>
          }
        />
      </div>
    </>
  )
}

export default PlayGame
