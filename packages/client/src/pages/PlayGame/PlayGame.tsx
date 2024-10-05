import { useAppSelector } from '@core/hooks'
import { shareLeaderboardResult } from '@core/store/reducers/leaderboard.reducer'
import { TAppDispatch } from '@core/store/store'
import { IUser } from '@core/utils/interfaces/User'
import { GameClient } from '@game/index'
import { GameStatistic } from '@game/types/types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Layout } from './Layout'
import { LooseGameBlock } from './LooseGameBlock'
import { PreloaderBlock } from './PreloaderBlock'
import { StartButtonBlock } from './StartButtonBlock'
import { WinGameBlock } from './WinGameBlock'

const PlayGame = () => {
  const user = useAppSelector(state => state.authReducer.userData)
  const [gameCase, setGameCase] = useState('start')
  const [gameStatistic, setGameStatistic] = useState<GameStatistic | null>(null)
  const dispatch = useDispatch<TAppDispatch>()

  const handleGameEnd = (statistic: GameStatistic) => {
    const { step, totalScore, startedAt, endedAt } = statistic

    setGameStatistic(statistic)
    setGameCase(step === 'won' ? 'win' : 'loose')

    if (step === 'won' && endedAt && startedAt && user) {
      dispatch(
        shareLeaderboardResult({
          alchemyGameScore: totalScore,
          startedAt,
          endedAt,
          user: user as IUser,
        })
      )
    }
  }

  return (
    <>
      <div>
        <Layout
          gameCase={gameCase}
          children={
            <>
              {gameCase === 'playing' && (
                <GameClient onGameEnd={handleGameEnd} />
              )}
              {gameCase === 'start' && (
                <StartButtonBlock setGameCase={setGameCase} />
              )}
              {gameCase === 'loading' && (
                <PreloaderBlock setGameCase={setGameCase} />
              )}
              {gameCase === 'win' && (
                <WinGameBlock
                  gameStatistic={gameStatistic}
                  setGameCase={setGameCase}
                />
              )}
              {gameCase === 'loose' && (
                <LooseGameBlock
                  gameStatistic={gameStatistic}
                  setGameCase={setGameCase}
                />
              )}
            </>
          }
        />
      </div>
    </>
  )
}

export default PlayGame
