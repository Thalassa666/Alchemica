import { ThemeProvider } from '@gravity-ui/uikit'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './mixins.scss'
import { startServiceWorker } from './serviceWorker'

startServiceWorker()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme="dark">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
