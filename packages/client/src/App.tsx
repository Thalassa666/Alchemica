import { useAppSelector } from '@core/hooks/useAppSelector'
import { serverRoutes } from '@core/router/serverRouter'
import { useEffect, useRef } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import common from '../src/assets/audio/common.mp3'
import game from '../src/assets/audio/game.mp3'
import './App.css'
import { routes } from '@core/router'

function App() {
  const gameAudio = useRef<HTMLAudioElement>(null)
  const { soundOn, track } = useAppSelector(state => state.soundReducer)

  useEffect(() => {
    if (soundOn) {
      gameAudio.current?.play()
    }
    if (!soundOn) {
      gameAudio.current?.pause()
    }
  }, [soundOn])

  const router = createBrowserRouter(routes)
  return (
    <>
      <RouterProvider router={router} />
      <audio ref={gameAudio} src={track === 'game' ? game : common} loop />
    </>
  )
}

export default App
