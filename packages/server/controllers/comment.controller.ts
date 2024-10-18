import { Request, Response } from 'express'
import { CommentModel, Comment, User, TopicModel } from '../models'
import { getEmptyFieldText, getErrorFromText, getTextFromError } from '../utils'
import { UserController } from './user.controller'

type CreateRequest = Omit<Comment, 'userId'> & {
  user: User
}

class CommentControllerCreator {
  constructor() {
    this.create = this.create.bind(this)
  }

  async create(req: Request<unknown, unknown, CreateRequest>, res: Response) {
    const { content, topicId, user } = req.body ?? {}
    const errorMessage = this.validate(req.body)

    if (errorMessage) {
      this.sendErrorText(res, errorMessage)

      return
    }

    try {
      const existingUser = await UserController.createOrFind(user)
      const existingTopic = await TopicModel.findByPk(topicId)

      if (!existingUser) {
        this.sendErrorText(res, 'Не могу определить пользователя')

        return
      }

      if (!existingTopic) {
        this.sendErrorText(res, 'Не могу определить топик')

        return
      }

      const createdComment = await CommentModel.create({
        userId: user.id,
        topicId,
        content,
      })

      res.status(200).json(createdComment)
    } catch (error) {
      const text = getTextFromError(error)
      res.status(500).json(getErrorFromText(text))
    }
  }

  private sendErrorText(res: Response, text: string) {
    res.status(400).json(getErrorFromText(text))
  }

  private validate(body: CreateRequest): string {
    const { content } = body ?? {}

    if (!content) {
      return getEmptyFieldText('content')
    }

    return ''
  }
}

export const CommentController = new CommentControllerCreator()
