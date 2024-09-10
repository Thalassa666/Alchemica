import styles from './styles.module.scss'
import { TextInput } from '@gravity-ui/uikit'
import useForm from '@core/hooks/useForms'
import {
  RegistrationFormData,
  registrationSchema,
} from '@core/validation/validationSchema'
import React, { useState } from 'react'
import { ArrowButton, TextButton, UploadAvatar } from '@components/UI'
import { useAppSelector } from '@core/hooks'
import { IUser } from '@core/utils/interfaces/User'
import { useDispatch } from 'react-redux'
import { TAppDispatch } from '@core/store/store'
import { getUserData, logoutUser } from '@core/store/reducers/auth.reducer'
import { useNavigate } from 'react-router-dom'
import { updateUserData } from '@core/store/reducers/user.reducer'

export const Profile = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const navigate = useNavigate()
  const [disable, setDisable] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { userData, isLoading } = useAppSelector(state => state.authReducer)
  const { first_name, second_name, login, email, phone, avatar } =
    userData as IUser

  const { formData, errors, handleChange, handleSubmit } =
    useForm<RegistrationFormData>({
      initialValues: {
        login: login,
        first_name: first_name,
        second_name: second_name,
        email: email,
        phone: phone,
      },
      validationSchema: registrationSchema,
      onSubmit: async values => {
        setIsSubmitting(true)
        try {
          await dispatch(updateUserData(values))
          await dispatch(getUserData())
          setDisable(true)
        } catch (error) {
          console.error('Error updating profile:', error)
        } finally {
          setIsSubmitting(false)
        }
      },
    })

  const handleDisabled = () => {
    setDisable(!disable)
  }

  const logout = async () => {
    await dispatch(logoutUser())
    navigate('/login')
  }

  const redirectToChangePass = () => {
    navigate('/change-pass')
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>WELCOME BACK</h2>
        <UploadAvatar src={avatar} />
        <p className={styles.name}>{first_name.toUpperCase()}</p>
        <TextInput
          size={'l'}
          type={'text'}
          placeholder={'login'}
          name={'login'}
          value={formData.login}
          onChange={handleChange}
          validationState={errors.login ? 'invalid' : undefined}
          errorMessage={errors.login}
          disabled={disable}
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
          disabled={disable}
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
          disabled={disable}
        />
        <TextInput
          size={'l'}
          type={'email'}
          placeholder={'email'}
          name={'email'}
          value={formData.email}
          onChange={handleChange}
          validationState={errors.email ? 'invalid' : undefined}
          errorMessage={errors.email}
          disabled={disable}
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
          disabled={disable}
        />
        <div className={styles.buttonBox}>
          <TextButton
            text={disable ? 'EDIT' : 'BLOCK'}
            onClick={handleDisabled}
          />
          <ArrowButton
            type={'submit'}
            disabled={isSubmitting || isLoading || disable}
          />
        </div>
        <TextButton text={'QUIT'} onClick={logout} />
        <TextButton text={'CHANGE PASSWORD'} onClick={redirectToChangePass} />
      </form>
    </>
  )
}
