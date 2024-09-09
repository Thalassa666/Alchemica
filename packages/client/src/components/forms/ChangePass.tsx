import { useDispatch } from 'react-redux'
import { TAppDispatch } from '@core/store/store'
import styles from '@components/forms/styles.module.scss'
import { TextInput } from '@gravity-ui/uikit'
import { ArrowButton, TextButton } from '@components/UI'
import { redirect, useNavigate } from 'react-router-dom'
import useForm from '@core/hooks/useForms'
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from '@core/validation/validationSchema'
import { useState } from 'react'

export const ChangePass = () => {
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
        console.log(values)
      },
    })

  // const handleSubmit = (): void => {}
  const redirectToProfile = () => {
    navigate('/profile')
  }
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>CHANGE PASSWORD</h2>
        {/* Поле для старого пароля */}
        <TextInput
          size={'l'}
          type={'password'}
          placeholder={'Old Password'}
          name={'oldPassword'}
          value={formData.oldPassword}
          onChange={handleChange}
          validationState={errors.oldPassword ? 'invalid' : undefined}
          errorMessage={errors.oldPassword}
        />

        {/* Поле для нового пароля */}
        <TextInput
          size={'l'}
          type={'password'}
          placeholder={'New Password'}
          name={'newPassword'}
          value={formData.newPassword}
          onChange={handleChange}
          validationState={errors.newPassword ? 'invalid' : undefined}
          errorMessage={errors.newPassword}
        />
        <ArrowButton type={'submit'} />
        <TextButton text={'TO PROFILE'} onClick={redirectToProfile} />
      </form>
    </>
  )
}
