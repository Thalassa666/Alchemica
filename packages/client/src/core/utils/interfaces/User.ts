export interface IUser {
  first_name: 'string'
  second_name: 'string'
  login: 'string'
  email: 'string'
  password: 'string'
  phone: 'string'
  avatar: 'string'
}

export interface IUserChangePass {
  password: string
}

export type TUserQuery = Pick<IUser, 'login' | 'password'>
