import { useDispatch } from 'react-redux'
import { TAppDispatch } from '@core/store/store'
import styles from '@components/forms/styles.module.scss'
import { TextInput } from '@gravity-ui/uikit'
import { ArrowButton, TextButton } from '@components/UI'
import { useNavigate } from 'react-router-dom'

export const ChangePass = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const navigate = useNavigate()

  // const handleSubmit = (): void => {}
  const redirectToProfile = () => {
    navigate('/profile')
  }
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput
          size={'l'}
          type={'text'}
          placeholder={'oldPassword'}
          name={'oldPassword'}
        />

        <TextInput
          size={'l'}
          type={'password'}
          placeholder={'newPassword'}
          name={'newPassword'}
        />
        <ArrowButton type={'submit'} />
        <TextButton text={'TO PROFILE'} onClick={redirectToProfile} />
      </form>
    </>
  )
}
