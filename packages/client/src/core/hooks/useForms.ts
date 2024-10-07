import { useState, ChangeEvent, FormEvent } from 'react'
import { z, ZodObject, ZodSchema } from 'zod'

type FormErrors<T> = Partial<Record<keyof T, string>>

interface UseFormOptions<T> {
  initialValues: T
  validationSchema?: ZodSchema<T>
  onSubmit: (values: T) => void
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormOptions<T>) {
  const [formData, setFormData] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof T; value: string }
    setFormData({
      ...formData,
      [name]: value,
    })

    if (validationSchema) {
      try {
        const schema = validationSchema as unknown as ZodObject<any>

        // Проверяем, существует ли поле в схеме
        const fieldSchema = schema.shape[name as keyof T]
        if (fieldSchema) {
          fieldSchema.parse(value)
          setErrors(prevErrors => ({
            ...prevErrors,
            [name]: undefined,
          }))
        }
      } catch (err) {
        const error = err as z.ZodError

        // Проверяем, есть ли ошибки и есть ли хотя бы одна ошибка
        if (error.errors && error.errors.length > 0) {
          setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error.errors[0].message, // Берем первое сообщение об ошибке
          }))
        }
      }
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validationSchema) {
      try {
        validationSchema.parse(formData)
        setErrors({})
        onSubmit(formData)
      } catch (err) {
        const error = err as z.ZodError
        const fieldErrors: FormErrors<T> = {}

        // Собираем все ошибки валидации
        error.errors.forEach(validationError => {
          const path = validationError.path[0] as keyof T
          if (!fieldErrors[path]) {
            fieldErrors[path] = validationError.message
          }
        })
        setErrors(fieldErrors)
      }
    } else {
      onSubmit(formData)
    }
  }

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  }
}
