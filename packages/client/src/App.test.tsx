import { render } from '@testing-library/react'
import App from './App'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve('hey'),
  }),
) as jest.Mock

test('Example test', async () => {
  render(<App />)
})
