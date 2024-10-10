import { store } from '@core/store/store'
import { startServiceWorker } from '@core/utils/serviceWorker'
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import './mixins.scss'

startServiceWorker()

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
