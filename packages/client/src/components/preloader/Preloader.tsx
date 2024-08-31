import { ArrowButton } from '@components/UI'
import {
  registrationSchema,
  RegistrationFormData,
} from '@core/validation/validationSchema'
import { TextInput } from '@gravity-ui/uikit'
import { ChangeEvent, FormEvent, useState } from 'react'
import { z } from 'zod'
import styles from './styles.module.scss'

export const Preloader = () => {
  return (
    <>
      <span className={styles.loader}></span>
    </>
  )
}
