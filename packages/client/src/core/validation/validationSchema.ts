import { z } from 'zod'

// Схема для валидации пользователя
export const registrationSchema = z.object({
  login: z.string().min(3, 'Логин должен содержать минимум 3 символа'),
  first_name: z.string().min(1, 'Имя обязательно для заполнения'),
  second_name: z.string().min(1, 'Фамилия обязательна для заполнения'),
  email: z.string().email('Некорректный адрес электронной почты'),
  phone: z
    .string()
    .min(10, 'Телефон должен содержать минимум 10 цифр')
    .regex(/^\d+$/, 'Телефон может содержать только цифры'),
  password: z
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .optional(),
})

// Схема для смены пароля
export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: 'Старый пароль должен содержать минимум 6 символов' }),
    newPassword: z
      .string()
      .min(6, { message: 'Новый пароль должен содержать минимум 6 символов' }),
  })
  .superRefine((data, ctx) => {
    if (data.oldPassword === data.newPassword) {
      ctx.addIssue({
        path: ['newPassword'],
        message: 'Новый пароль не должен совпадать со старым',
        code: 'custom',
      })
    }
  })

export const loginSchema = z.object({
  login: z.string().min(1, 'Поле не может быть пустым'),
  password: z.string().min(1, 'Поле не может быть пустым'),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
