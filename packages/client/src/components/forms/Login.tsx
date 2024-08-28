import styles from './styles.module.scss'
import { TextInput } from '@gravity-ui/uikit'
import { Link, Navigate, redirect } from 'react-router-dom'
import { ArrowButton } from '@components/UI'
import useForm from '@core/hooks/useForms'
import { loginSchema } from '@core/validation/validationSchema'
import { useDispatch } from 'react-redux'
import { TAppDispatch } from '@core/store/store'
import { loginUser } from '@core/store/redusers/auth.reduser'
import { TUserQuery } from '@core/utils/interfaces/User'
import { useAppSelector } from '@core/hooks/useAppSelector'

type TLoginFormData = {
  login: string
  password: string
}

export const Login = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const { isAuth } = useAppSelector(state => state.authReducer)

  const { formData, errors, handleChange, handleSubmit } =
    useForm<TLoginFormData>({
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

  if (isAuth) {
    return <Navigate to="/game" replace />
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>ВХОД В ИГРУ</h2>

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
        type={'password'}
        placeholder={'password'}
        name={'password'}
        value={formData.password}
        onChange={handleChange}
        validationState={errors.password ? 'invalid' : undefined}
        errorMessage={errors.password}
      />

      <ArrowButton type={'submit'} />
      <Link className={styles.link} to={'/register'}>
        Зарегистрироваться
      </Link>
    </form>
  )
}
