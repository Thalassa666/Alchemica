import { ArrowButton, Input } from '@components/UI'
import { useForm } from '@core/hooks'
import { registerUser } from '@core/store/reducers/auth.reducer'
import { soundActions } from '@core/store/reducers/sound.reducer'
import { TAppDispatch } from '@core/store/store'
import { IUser } from '@core/utils/interfaces/User'
import {
  RegistrationFormData,
  registrationSchema,
} from '@core/validation/validationSchema'
import { useDispatch } from 'react-redux'
import { Link, redirect } from 'react-router-dom'
import styles from './styles.module.scss'

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

  const onMusicClick = () => {
    dispatch(soundActions.switchSound())
  }

  return (
    <>
      <div className={`${styles.titleOverlay} ${styles.titleOverlay_register}`}>
        <h1>ALCHEMIST</h1>
        <button className={styles.musicButton} onClick={onMusicClick}></button>
      </div>
      <form
        className={`${styles.form} ${styles.form_register}`}
        onSubmit={handleSubmit}
      >
        <h2>REGISTER</h2>
        <Input
          size={'m'}
          type={'text'}
          placeholder={'login'}
          name={'login'}
          value={formData.login}
          onChange={handleChange}
          validationState={errors.login ? 'invalid' : undefined}
          errorMessage={errors.login}
          autoComplete={'login'}
        />
        <Input
          size={'m'}
          type={'text'}
          placeholder={'first_name'}
          name={'first_name'}
          value={formData.first_name}
          onChange={handleChange}
          validationState={errors.first_name ? 'invalid' : undefined}
          errorMessage={errors.first_name}
          autoComplete={'name'}
        />
        <Input
          size={'m'}
          type={'text'}
          placeholder={'second_name'}
          name={'second_name'}
          value={formData.second_name}
          onChange={handleChange}
          validationState={errors.second_name ? 'invalid' : undefined}
          errorMessage={errors.second_name}
          autoComplete={'name'}
        />
        <Input
          size={'m'}
          type={'email'}
          placeholder={'email'}
          name={'email'}
          value={formData.email}
          onChange={handleChange}
          validationState={errors.email ? 'invalid' : undefined}
          errorMessage={errors.email}
          autoComplete={'email'}
        />
        <Input
          size={'m'}
          type={'tel'}
          placeholder={'phone'}
          name={'phone'}
          value={formData.phone}
          onChange={handleChange}
          validationState={errors.phone ? 'invalid' : undefined}
          errorMessage={errors.phone}
          autoComplete={'phone'}
        />
        <Input
          size={'m'}
          type={'password'}
          placeholder={'password'}
          name={'password'}
          value={formData.password}
          onChange={handleChange}
          validationState={errors.password ? 'invalid' : undefined}
          errorMessage={errors.password}
          autoComplete={'password'}
        />
        <ArrowButton type={'submit'} data-testid="submitBtn" />
        <Link className={styles.link} to={'/login'}>
          Вход в игру
        </Link>
      </form>
    </>
  )
}
