import './App.css'
import { router } from '@core/router'
import { RouterProvider } from 'react-router-dom'
import { store } from '@core/store/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
