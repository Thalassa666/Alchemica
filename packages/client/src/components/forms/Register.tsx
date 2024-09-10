import styles from './styles.module.scss'
import { TextInput } from '@gravity-ui/uikit'
import { ArrowButton } from '@components/UI'
import {
  RegistrationFormData,
  registrationSchema,
} from '@core/validation/validationSchema'
import { useDispatch } from 'react-redux'
import { TAppDispatch } from '@core/store/store'
import useForm from '@core/hooks/useForms'
import { redirect } from 'react-router-dom'
import { IUser } from '@core/utils/interfaces/User'
import { registerUser } from '@core/store/reducers/auth.reducer'

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
      <form className={styles.form} onSubmit={handleSubmit}>
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
      </form>
    </>
  )
}
