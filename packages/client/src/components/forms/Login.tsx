import styles from './styles.module.scss'
import { Button, TextInput } from '@gravity-ui/uikit'
import { Link } from 'react-router-dom'

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
        <Button>Войти</Button>
        <Link to={'/register'}>Зарегистрироваться</Link>
      </form>
    </>
  )
}
