import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Register } from '@components/forms/Register'
import { Provider } from 'react-redux'
import { store } from '@core/store/store'
import { BrowserRouter } from 'react-router-dom'

describe('Register', () => {
  test('should render form elements correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('REGISTER')).toBeInTheDocument()

    expect(screen.getByPlaceholderText('login')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('first_name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('second_name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('phone')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument()

    expect(screen.getByTestId('submitBtn')).toBeInTheDocument()

    expect(screen.getByText('Вход в игру')).toBeInTheDocument()
  })

  test('should update input fields on change', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    )

    const loginInput = screen.getByPlaceholderText('login')
    const firstNameInput = screen.getByPlaceholderText('first_name')

    fireEvent.change(loginInput, { target: { value: 'TestLogin' } })
    expect(loginInput).toHaveValue('TestLogin')

    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    expect(firstNameInput).toHaveValue('John')
  })

  test('should display validation errors on submit with empty fields', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    )

    const submitButton = screen.getByTestId('submitBtn')
    fireEvent.click(submitButton)

    const loginError = await screen.findByText(
      'Логин должен содержать минимум 3 символа'
    )
    expect(loginError).toBeInTheDocument()

    const emailError = await screen.findByText(
      'Некорректный адрес электронной почты'
    )
    expect(emailError).toBeInTheDocument()
  })
})
