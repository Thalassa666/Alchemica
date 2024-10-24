import { useDispatch } from 'react-redux'
import { TAppDispatch } from '@core/store/store'
import styles from '@components/forms/styles.module.scss'
import { ArrowButton, TextButton, Input } from '@components/UI'
import { useNavigate } from 'react-router-dom'
import { useForm, useAppSelector } from '@core/hooks'
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from '@core/validation/validationSchema'
import { useState } from 'react'
import { changePassword } from '@core/store/reducers/user.reducer'

export const ChangePass = () => {
  const { isLoading, isError, errorMessage } = useAppSelector(
    state => state.userReducer
  )
  const dispatch = useDispatch<TAppDispatch>()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { formData, errors, handleChange, handleSubmit } =
    useForm<ChangePasswordFormData>({
      initialValues: {
        oldPassword: '',
        newPassword: '',
      },
      validationSchema: changePasswordSchema,
      onSubmit: async values => {
        setIsSubmitting(true)
        try {
          await dispatch(changePassword(values)).unwrap()
          navigate('/profile') // Перенаправляем на страницу профиля после успешной смены пароля
        } catch (error) {
          console.error('Ошибка при смене пароля:', error)
        } finally {
          setIsSubmitting(false)
        }
      },
    })

  const redirectToProfile = () => {
    navigate('/profile')
  }
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>CHANGE PASSWORD</h2>
        {/* Поле для старого пароля */}
        <Input
          size={'l'}
          type={'password'}
          placeholder={'Old Password'}
          name={'oldPassword'}
          value={formData.oldPassword}
          onChange={handleChange}
          validationState={errors.oldPassword ? 'invalid' : undefined}
          errorMessage={errors.oldPassword}
          autoComplete={'password'}
        />

        {/* Поле для нового пароля */}
        <Input
          size={'l'}
          type={'password'}
          placeholder={'New Password'}
          name={'newPassword'}
          value={formData.newPassword}
          onChange={handleChange}
          validationState={errors.newPassword ? 'invalid' : undefined}
          errorMessage={errors.newPassword}
          autoComplete={'new-password'}
        />
        <ArrowButton type={'submit'} disabled={isSubmitting || isLoading} />
        <TextButton text={'TO PROFILE'} onClick={redirectToProfile} />

        {/* Отображение ошибок, если они есть */}
        {isError && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </>
  )
}
