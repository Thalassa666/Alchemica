import { z } from 'zod'

export const registrationSchema = z.object({
  username: z
    .string()
    .min(3, 'Имя пользователя должно состоять минимум из 3 букв'),
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен быть длиннее 6 сиволов'),
})
