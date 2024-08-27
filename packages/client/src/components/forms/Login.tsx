import styles from './styles.module.scss'
import { TextInput } from '@gravity-ui/uikit'
import { Link } from 'react-router-dom'
import { ArrowButton } from '@components/UI'

export const Login = () => {
  return (
    <>
      <form className={styles.form}>
        <h2>ВХОД В ИГРУ</h2>
        <TextInput
          size={'l'}
          type={'text'}
          placeholder={'login'}
          name={'login'}
        />
        <TextInput
          size={'l'}
          type={'password'}
          placeholder={'password'}
          name={'password'}
        />
        <ArrowButton type={'submit'} />
        <Link className={styles.link} to={'/register'}>
          Зарегистрироваться
        </Link>
      </form>
    </>
  )
}
