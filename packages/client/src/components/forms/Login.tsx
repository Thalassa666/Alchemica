import styles from './styles.module.scss'
import { TextInput } from '@gravity-ui/uikit'
import { Link, Navigate, redirect } from 'react-router-dom'
import { ArrowButton } from '@components/UI'
import useForm from '@core/hooks/useForms'
import { LoginFormData, loginSchema } from '@core/validation/validationSchema'
import { useDispatch } from 'react-redux'
import { TAppDispatch } from '@core/store/store'
import { loginUser } from '@core/store/reducers/auth.reducer'
import { TUserQuery } from '@core/utils/interfaces/User'

export const Login = () => {
  const dispatch = useDispatch<TAppDispatch>()

  const { formData, errors, handleChange, handleSubmit } =
    useForm<LoginFormData>({
      initialValues: {
        login: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit: async values => {
        await dispatch(loginUser(values as TUserQuery))
        redirect('/game')
      },
    })

  return (
    <>
      <div className={styles.titleOverlay}>
        <h1>ALCHEMIST</h1>
        <button className={styles.musicButton}></button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>LOGIN GAME</h2>

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
        <Link className={styles.link} to={'/register'}>
          Зарегистрироваться
        </Link>
      </form>
    </>
  )
}
