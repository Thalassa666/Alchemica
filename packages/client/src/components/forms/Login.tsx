import styles from './styles.module.scss'
import { TextInput } from '@gravity-ui/uikit'
import { Link } from 'react-router-dom'
import { ArrowButton } from '@components/UI'
import { ChangeEvent, FormEvent, useState } from 'react'
import { RegistrationFormData } from '@core/validation/validationSchema'

type TLoginFormData = {
  login: string
  password: string
}

export const Login = () => {
  const [formData, setFormData] = useState<TLoginFormData>({
    login: '',
    password: '',
  })
  const [errors, setErrors] = useState<
    Partial<Record<keyof TLoginFormData, string>>
  >({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors: Partial<Record<keyof TLoginFormData, string>> = {}

    if (formData.login === '') {
      newErrors.login = 'Поле не может быть пустым'
    }

    if (formData.password === '') {
      newErrors.password = 'Поле не может быть пустым'
    }

    setErrors(newErrors)

    if (!newErrors.login && !newErrors.password) {
      // Отправка формы или другая логика
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>ВХОД В ИГРУ</h2>
        <TextInput
          size={'l'}
          type={'text'}
          placeholder={'login'}
          name={'login'}
          onChange={handleChange}
          validationState={errors.login ? 'invalid' : undefined}
          errorMessage={errors.login}
        />
        <TextInput
          size={'l'}
          type={'password'}
          placeholder={'password'}
          name={'password'}
          onChange={handleChange}
          validationState={errors.password ? 'invalid' : undefined}
          errorMessage={errors.password}
        />
        <ArrowButton type={'submit'} />
        <Link className={styles.link} to={'/register'}>
          Зарегистрироваться
        </Link>
      </form>
    </>
  )
}
