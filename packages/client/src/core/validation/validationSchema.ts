import { z } from 'zod'

// Пока одна схема так как одна форма, остальные можно добавить по аналогии.

export const registrationSchema = z.object({
  login: z.string().min(3, 'Логин должен содержать минимум 3 символа'),
  first_name: z.string().min(1, 'Имя обязательно для заполнения'),
  second_name: z.string().min(1, 'Фамилия обязательна для заполнения'),
  email: z.string().email('Некорректный адрес электронной почты'),
  phone: z.string().min(10, 'Телефон должен содержать минимум 10 цифр'),
  password: z
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .optional(),
})

export const loginSchema = z.object({
  login: z.string().min(1, 'Поле не может быть пустым'),
  password: z.string().min(1, 'Поле не может быть пустым'),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
export type LoginFormData = z.infer<typeof loginSchema>
