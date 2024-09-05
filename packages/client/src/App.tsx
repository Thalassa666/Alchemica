import './App.css'
import { router } from '@core/router'
import { RouterProvider } from 'react-router-dom'
import { store } from '@core/store/store'
import { Provider } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import Error from '@pages/Error'
import errorPotionImage from './assets/images/error_potion.png'

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary
        fallback={
          <Error
            errorCode={500}
            errorMessage="Упс, что-то сломалось :-("
            errorPicture={errorPotionImage}
          />
        }
      >
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  )
}

export default App
