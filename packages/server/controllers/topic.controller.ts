import { Request, Response } from 'express'
import {
  TopicModel,
  Topic,
  CommentModel,
  ReplyModel,
  UserModel,
  User,
  AsKey,
} from '../models'
import { getEmptyFieldText, getErrorFromText, getTextFromError } from '../utils'
import { UserController } from './user.controller'

type CreateRequest = Omit<Topic, 'userId'> & {
  user: User
}

class TopicControllerCreator {
  constructor() {
    this.getAll = this.getAll.bind(this)
    this.create = this.create.bind(this)
  }

  async getAll(_req: Request, res: Response) {
    try {
      const topics = await TopicModel.findAndCountAll({
        include: [
          {
            model: CommentModel,
            as: AsKey.Comments,
            include: [
              {
                model: ReplyModel,
                as: AsKey.Replies,
                include: [
                  {
                    model: UserModel,
                    as: AsKey.User,
                  },
                ],
              },
              {
                model: UserModel,
                as: AsKey.User,
              },
            ],
          },
          {
            model: UserModel,
            as: AsKey.User,
          },
        ],
      })
      res.status(200).json(topics)
    } catch (error) {
      const text = getTextFromError(error)
      res.status(500).json(getErrorFromText(text))
    }
  }

  async create(req: Request<unknown, unknown, CreateRequest>, res: Response) {
    const { title, user } = req.body
    const errorMessage = this.validate(req.body)

    if (errorMessage) {
      this.sendErrorText(res, errorMessage)
      return
    }

    try {
      const existingUser = await UserController.createOrFind(user)

      if (!existingUser) {
        this.sendErrorText(res, 'Не могу определить пользователя')

        return
      }

      const createdTopic = await TopicModel.create({
        userId: user.id,
        title,
      })

      res.status(200).json(createdTopic)
    } catch (error) {
      const text = getTextFromError(error)
      res.status(500).json(getErrorFromText(text))
    }
  }

  private sendErrorText(res: Response, text: string) {
    res.status(400).json(getErrorFromText(text))
  }

  private validate(body: CreateRequest): string {
    const { title } = body ?? {}

    if (!title) {
      return getEmptyFieldText('title')
    }

    return ''
  }
}

export const TopicController = new TopicControllerCreator()
