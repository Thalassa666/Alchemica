import styles from './styles.module.scss'
import { TextInput } from '@gravity-ui/uikit'
import useForm from '@core/hooks/useForms'
import {
  RegistrationFormData,
  registrationSchema,
} from '@core/validation/validationSchema'

export const Profile = () => {
  const { formData, errors, handleChange, handleSubmit } =
    useForm<RegistrationFormData>({
      initialValues: {
        login: '',
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
      },
      validationSchema: registrationSchema,
      onSubmit: async values => {
        console.log(values)
      },
    })
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
    </form>
  )
}
