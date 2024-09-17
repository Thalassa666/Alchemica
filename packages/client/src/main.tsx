import { ThemeProvider } from '@gravity-ui/uikit'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './mixins.scss'
import { Provider } from 'react-redux'
import { store } from '@core/store/store'
import { startServiceWorker } from '@core/utils/serviceWorker'

startServiceWorker()

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ThemeProvider theme="dark">
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
