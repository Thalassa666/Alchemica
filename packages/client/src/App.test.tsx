import { store } from '@core/store/store'
import { render, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from './App'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

HTMLMediaElement.prototype.pause = jest.fn()

test('Example test', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  })
})
