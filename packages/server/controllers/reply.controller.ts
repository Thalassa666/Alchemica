import { Request, Response } from 'express'
import { ReplyModel, Reply, User, CommentModel } from '../models'
import { getEmptyFieldText, getErrorFromText, getTextFromError } from '../utils'
import { UserController } from './user.controller'

type CreateRequest = Omit<Reply, 'userId'> & {
  user: User
}

class ReplyControllerCreator {
  constructor() {
    this.create = this.create.bind(this)
  }

  async create(req: Request<unknown, unknown, CreateRequest>, res: Response) {
    const { user, commentId, content } = req.body
    const errorMessage = this.validate(req.body)

    if (errorMessage) {
      this.sendErrorText(res, errorMessage)

      return
    }

    try {
      const existingUser = await UserController.createOrFind(user)
      const existingComment = await CommentModel.findByPk(commentId)

      if (!existingUser) {
        this.sendErrorText(res, 'Не могу определить пользователя')

        return
      }

      if (!existingComment) {
        this.sendErrorText(res, 'Не могу определить комментарий')

        return
      }

      const createdReply = await ReplyModel.create({
        userId: user.id,
        commentId,
        content,
      })

      res.status(200).json(createdReply)
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

export const ReplyController = new ReplyControllerCreator()
