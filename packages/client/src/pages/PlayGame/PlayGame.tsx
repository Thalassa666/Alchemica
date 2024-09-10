import { Header } from '@components/header/Header'
import { GameClient } from '@game/index'
import { GameStatistic } from '@game/types/types'
import { useState } from 'react'
import { Layout } from './Layout'
import { LooseGameBlock } from './LooseGameBlock'
import { PreloaderBlock } from './PreloaderBlock'
import { StartButtonBlock } from './StartButtonBlock'
import { WinGameBlock } from './WinGameBlock'

const PlayGame = () => {
  const [gameCase, setGameCase] = useState('start')
  const [gameStatistic, setGameStatistic] = useState<GameStatistic | null>(null)

  const handleGameEnd = (statistic: GameStatistic) => {
    setGameStatistic(statistic)
    setGameCase(statistic.step === 'won' ? 'win' : 'loose')
  }

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
              {gameCase === 'playing' && (
                <GameClient onGameEnd={handleGameEnd} />
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
