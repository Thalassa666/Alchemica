import common from '@assets/audio/common.mp3'
import game from '@assets/audio/game.mp3'
import { useAppSelector } from '@core/hooks/useAppSelector'
import { router } from '@core/router'
import { useEffect, useRef } from 'react'
import { RouterProvider } from 'react-router-dom'
import './App.css'

function App() {
  const gameAudio = useRef<any>()
  const { soundOn, track } = useAppSelector(state => state.soundReducer)

  useEffect(() => {
    if (soundOn) {
      console.log('sound on!')
      gameAudio.current.play()
    }
    if (!soundOn) {
      console.log('sound off')
      gameAudio.current.pause()
    }
  }, [soundOn])

  return (
    <>
      <RouterProvider router={router} />
      <audio ref={gameAudio} src={track === 'game' ? game : common} loop />
    </>
  )
}

export default App
