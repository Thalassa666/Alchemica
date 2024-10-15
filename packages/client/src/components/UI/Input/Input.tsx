import React, { ChangeEvent } from 'react'
import styles from './input.module.scss'

interface InputProps {
  size: 's' | 'm' | 'l'
  type: 'text' | 'password' | 'email' | 'number' | 'tel'
  placeholder: string
  name: string
  value: string | undefined | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  validationState?: 'valid' | 'invalid'
  errorMessage?: string
  autoComplete?: string
  disabled?: boolean
}

export const Input = ({
  size,
  type,
  placeholder,
  name,
  value,
  onChange,
  validationState,
  errorMessage,
  autoComplete = 'off',
  disabled = false,
}: InputProps) => {
  const inputSizeClass = styles[`input-${size}`]
  const validationClass =
    validationState === 'invalid' ? styles['input-error'] : ''

  return (
    <div className={`${styles['input-container']} ${inputSizeClass}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${styles['input-field']} ${validationClass}`}
        disabled={disabled}
      />
      {validationState === 'invalid' && (
        <span className={styles['input-error-message']}>{errorMessage}</span>
      )}
    </div>
  )
}
