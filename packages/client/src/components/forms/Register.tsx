import styles from './styles.module.scss'
import { Button, TextInput } from '@gravity-ui/uikit'
import { Link } from 'react-router-dom'

export const Register = () => {
  return (
    <>
      <form className={styles.form}>
        <h2>ЗАРЕГИСТРИРОВАТЬСЯ</h2>
        <TextInput
          size={'l'}
          type={'text'}
          placeholder={'login'}
          name={'login'}
        />
        <TextInput
          size={'l'}
          type={'text'}
          placeholder={'first_name'}
          name={'first_name'}
        />
        <TextInput
          size={'l'}
          type={'text'}
          placeholder={'second_name'}
          name={'second_name'}
        />
        <TextInput
          size={'l'}
          type={'email'}
          placeholder={'first_name'}
          name={'email'}
        />
        <TextInput
          size={'l'}
          type={'tel'}
          placeholder={'phone'}
          name={'phone'}
        />
        <TextInput
          size={'l'}
          type={'password'}
          placeholder={'password'}
          name={'password'}
        />
        <Button>Зарегистрироваться</Button>
      </form>
    </>
  )
}
