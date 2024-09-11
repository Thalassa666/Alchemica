import { ArrowButton } from '@components/UI'
import useForm from '@core/hooks/useForms'
import { TAppDispatch } from '@core/store/store'
import { IUser } from '@core/utils/interfaces/User'
import {
  RegistrationFormData,
  registrationSchema,
} from '@core/validation/validationSchema'
import { TextInput } from '@gravity-ui/uikit'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@core/hooks/useAppSelector'
import { Link, Navigate, redirect } from 'react-router-dom'
import styles from './styles.module.scss'
import { registerUser } from '@core/store/redusers/auth.reduser'

export const Register = () => {
  const dispatch = useDispatch<TAppDispatch>()

  const { formData, errors, handleChange, handleSubmit } =
    useForm<RegistrationFormData>({
      initialValues: {
        login: '',
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
        password: '',
      },
      validationSchema: registrationSchema,
      onSubmit: async values => {
        await dispatch(registerUser(values as IUser))
        redirect('/login')
      },
    })

  return (
    <>
      <div className={`${styles.titleOverlay} ${styles.titleOverlay_register}`}>
        <h1>ALCHEMIST</h1>
        <button className={styles.musicButton}></button>
      </div>
      <form
        className={`${styles.form} ${styles.form_register}`}
        onSubmit={handleSubmit}
      >
        <h2>REGISTER</h2>
        <TextInput
          size={'l'}
          type={'text'}
          placeholder={'login'}
          name={'login'}
          value={formData.login}
          onChange={handleChange}
          validationState={errors.login ? 'invalid' : undefined}
          errorMessage={errors.login}
          autoComplete={'login'}
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
          autoComplete={'name'}
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
          autoComplete={'name'}
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
          autoComplete={'email'}
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
          autoComplete={'phone'}
        />
        <TextInput
          size={'l'}
          type={'password'}
          placeholder={'password'}
          name={'password'}
          value={formData.password}
          onChange={handleChange}
          validationState={errors.password ? 'invalid' : undefined}
          errorMessage={errors.password}
          autoComplete={'password'}
        />
        <ArrowButton type={'submit'} />
        <Link className={styles.link} to={'/login'}>
          Вход в игру
        </Link>
      </form>
    </>
  )
}
