import { useAppSelector } from '@core/hooks/useAppSelector'
import { useEffect, useRef } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import common from '../src/assets/audio/common.mp3'
import game from '../src/assets/audio/game.mp3'
import cut from '../src/assets/audio/cut.mp3'
import fire from '../src/assets/audio/fire.mp3'
import boil from '../src/assets/audio/boiling.mp3'
import page from '../src/assets/audio/page.mp3'
import './App.css'
import { routes } from '@core/router'

function App() {
  const gameAudio = useRef<HTMLAudioElement>(null)
  const cutAudio = useRef<HTMLAudioElement>(null)
  const boilAudio = useRef<HTMLAudioElement>(null)
  const fireAudio = useRef<HTMLAudioElement>(null)
  const pageAudio = useRef<HTMLAudioElement>(null)
  const { soundOn, track, sound } = useAppSelector(state => state.soundReducer)

  useEffect(() => {
    if (soundOn) {
      gameAudio.current?.play()
    }
    if (!soundOn) {
      gameAudio.current?.pause()
    }
  }, [soundOn])

  useEffect(() => {
    if (sound) {
      console.log(sound)
      sound === 'cut' && cutAudio.current?.play()
      sound === 'fire' && fireAudio.current?.play()
      sound === 'boil' && boilAudio.current?.play()
      sound === 'page' && pageAudio.current?.play()
    }
  }, [sound])

  const router = createBrowserRouter(routes)
  return (
    <>
      <RouterProvider router={router} />
      <audio ref={gameAudio} src={track === 'game' ? game : common} loop />
      <audio ref={cutAudio} src={cut} loop={false} />
      <audio ref={boilAudio} src={boil} loop={false} />
      <audio ref={fireAudio} src={fire} loop={false} />
      <audio ref={pageAudio} src={page} loop={false} />
    </>
  )
}

export default App
