import { ArrowButton } from '@components/UI'
import { useAppSelector } from '@core/hooks'
import useForm from '@core/hooks/useForms'
import {
  loginUser,
  loginUserWithYandex,
  getAppIDForYandex,
} from '@core/store/reducers/auth.reducer'
import { soundActions } from '@core/store/reducers/sound.reducer'
import { TAppDispatch } from '@core/store/store'
import { TUserQuery } from '@core/utils/interfaces/User'
import { LoginFormData, loginSchema } from '@core/validation/validationSchema'
import { TextInput } from '@gravity-ui/uikit'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, redirect } from 'react-router-dom'
import styles from './styles.module.scss'

export const Login = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const { appID } = useAppSelector(state => state.authReducer)

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

  const onMusicClick = () => {
    dispatch(soundActions.switchSound())
  }

  const onYandexButtonClick = () => {
    dispatch(getAppIDForYandex())
  }

  useEffect(() => {
    if (appID !== null && appID !== undefined) {
      console.log('start')
      console.log(appID)
      const redirect_uri = 'http://localhost:3000'
      window.location.replace(
        `https://oauth.yandex.ru/authorize?response_type=code&client_id=${appID}&redirect_uri=${redirect_uri}`
      )
      /*open(
        `https://oauth.yandex.ru/authorize?response_type=code&client_id=${appID}&redirect_uri=${redirect_uri}` /*, "_self"*/
      //)
    }
  }, [appID])

  return (
    <>
      <div className={styles.titleOverlay}>
        <h1>ALCHEMIST</h1>
        <button className={styles.musicButton} onClick={onMusicClick}></button>
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
        <button className={styles.linkButton} onClick={onYandexButtonClick}>
          Или войти через Яндекс
        </button>
      </form>
    </>
  )
}
