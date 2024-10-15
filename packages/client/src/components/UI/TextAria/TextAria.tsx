import React, { ChangeEvent } from 'react'
import styles from './textAria.module.scss'

interface TextAreaProps {
  className?: string
  size: 's' | 'm' | 'l' | 'xl' // Different size options
  minRows?: number // Minimum number of rows
  maxRows?: number // Maximum number of rows
  placeholder: string
  name: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
}

export const TextArea = ({
  className,
  size,
  minRows = 3,
  maxRows = 3,
  placeholder,
  name,
  value = '',
  onChange,
  disabled = false,
}: TextAreaProps) => {
  const sizeClass = styles[`textarea-${size}`] // Dynamically apply size classes

  return (
    <div
      className={`${styles['textarea-container']} ${sizeClass} ${className}`}
    >
      <textarea
        className={styles['textarea-field']}
        name={name}
        placeholder={placeholder}
        rows={minRows}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          minHeight: `${minRows * 20}px`,
          maxHeight: `${maxRows * 20}px`,
        }} // Adjustable height
      />
    </div>
  )
}
