import { Router } from 'express'
import {
  TopicController,
  CommentController,
  ReplyController,
} from '../controllers'
import { ApiRoute } from './names'

const ExpressRouter = Router()

ExpressRouter.get(ApiRoute.Main, (_, res) => {
  res.json('👋 Howdy from the server :)')
})

ExpressRouter.post(ApiRoute.Reply, ReplyController.create)
ExpressRouter.post(ApiRoute.Comment, CommentController.create)
ExpressRouter.get(ApiRoute.Topics, TopicController.getAll)
ExpressRouter.post(ApiRoute.Topic, TopicController.create)

export default ExpressRouter
