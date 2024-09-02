export interface IUser {
  first_name: 'string'
  second_name: 'string'
  login: 'string'
  email: 'string'
  password: 'string'
  phone: 'string'
}

export type TUserQuery = Pick<IUser, 'login' | 'password'>
