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
  oldPassword: string
  newPassword: string
}

export type TUserQuery = Pick<IUser, 'login' | 'password'>

export type TOauthRequest = {
  code: string
  redirect_uri: string
}

export type TOauthRequest1 = {
  code: string
  redirect_uri: string
  jwt: string
}
