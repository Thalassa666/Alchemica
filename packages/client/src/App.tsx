import { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '@pages/Login'
import Home from '@pages/Home'
import Register from '@pages/Register'
import Profile from '@pages/Profile'
import Game from '@pages/Game'
import Leaderboard from '@pages/Leaderboard'
import Forum from '@pages/Forum'
import Topic from '@pages/Topic'
import Error from '@pages/Error'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:topicId" element={<Topic />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
