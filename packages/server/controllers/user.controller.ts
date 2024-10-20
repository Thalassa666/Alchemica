import { Request, Response } from 'express'
import { UserModel, User } from '../models'
import { getEmptyFieldText, getErrorFromText, getTextFromError } from '../utils'

class UserControllerCreator {
  constructor() {
    this.createOrFind = this.createOrFind.bind(this)
    this.create = this.create.bind(this)
  }

  async createOrFind(user: User) {
    try {
      let userInDb = await UserModel.findByPk(user?.id)

      if (!userInDb) {
        userInDb = await this.createUser(user)
      }

      return userInDb
    } catch (error) {
      throw new Error('Произошла ошибка при поиске/создании пользователя')
    }
  }

  async create(req: Request<unknown, unknown, User>, res: Response) {
    const user = req.body ?? {}

    try {
      const createdUser = await this.createUser(user)

      res.status(200).json(createdUser)
    } catch (error) {
      const text = getTextFromError(error)
      res.status(500).json(getErrorFromText(text))
    }
  }

  private async createUser(user: User) {
    const errorMessage = this.validate(user)

    if (errorMessage) {
      throw new Error(errorMessage)
    }

    const createdUser = await UserModel.create(user)
    return createdUser
  }

  private validate(user: User) {
    const { id, login } = user ?? {}

    if (!id) {
      return getEmptyFieldText('id')
    }

    if (!login) {
      return getEmptyFieldText('login')
    }

    return ''
  }
}

export const UserController = new UserControllerCreator()
