import styles from './styles.module.scss'
import { TextInput } from '@gravity-ui/uikit'
import { ArrowButton } from '@components/UI'
import { ChangeEvent, FormEvent, useState } from 'react'
import { z } from 'zod'
import {
  registrationSchema,
  RegistrationFormData,
} from '@core/validation/validationSchema'

export const Register = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    login: '',
    first_name: '',
    second_name: '',
    email: '',
    phone: '',
    password: '',
  })
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegistrationFormData, string>>
  >({})

  const validateField = (name: keyof RegistrationFormData, value: string) => {
    try {
      const fieldSchema = registrationSchema.shape[name] // Получаем схему для конкретного поля
      fieldSchema.parse(value) // Проверяем значение поля
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined, // Если ошибок нет, удаляем сообщение об ошибке
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: error.errors[0]?.message, // Устанавливаем сообщение об ошибке
        }))
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    validateField(name as keyof RegistrationFormData, value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      registrationSchema.parse(formData)
      console.log('Форма отправлена:', formData)
      // Обработка отправки формы
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<
          Record<keyof RegistrationFormData, string>
        > = {}
        error.errors.forEach(err => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof RegistrationFormData] =
              err.message
          }
        })
        setErrors(formattedErrors)
      }
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>ЗАРЕГИСТРИРОВАТЬСЯ</h2>
        <TextInput
          size={'l'}
          type={'text'}
          placeholder={'login'}
          name={'login'}
          value={formData.login}
          onChange={handleChange}
          validationState={errors.login ? 'invalid' : undefined}
          errorMessage={errors.login}
        />
        <TextInput
          size={'l'}
          type={'text'}
          placeholder={'first_name'}
          name={'first_name'}
          value={formData.first_name}
          onChange={handleChange}
          validationState={errors.first_name ? 'invalid' : undefined}
          errorMessage={errors.first_name}
        />
        <TextInput
          size={'l'}
          type={'text'}
          placeholder={'second_name'}
          name={'second_name'}
          value={formData.second_name}
          onChange={handleChange}
          validationState={errors.second_name ? 'invalid' : undefined}
          errorMessage={errors.second_name}
        />
        <TextInput
          size={'l'}
          type={'email'}
          placeholder={'first_name'}
          name={'email'}
          value={formData.email}
          onChange={handleChange}
          validationState={errors.email ? 'invalid' : undefined}
          errorMessage={errors.email}
        />
        <TextInput
          size={'l'}
          type={'tel'}
          placeholder={'phone'}
          name={'phone'}
          value={formData.phone}
          onChange={handleChange}
          validationState={errors.phone ? 'invalid' : undefined}
          errorMessage={errors.phone}
        />
        <TextInput
          size={'l'}
          type={'password'}
          placeholder={'password'}
          value={formData.password}
          onChange={handleChange}
          validationState={errors.password ? 'invalid' : undefined}
          errorMessage={errors.password}
        />
        <ArrowButton type={'submit'} />
      </form>
    </>
  )
}
