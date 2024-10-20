import { Router } from 'express'
import {
  TopicController,
  CommentController,
  ReplyController,
} from '../controllers'

const ExpressRouter = Router()

ExpressRouter.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

ExpressRouter.post('/reply', ReplyController.create)
ExpressRouter.post('/comment', CommentController.create)
ExpressRouter.get('/topics', TopicController.getAll)
ExpressRouter.post('/topic', TopicController.create)

export default ExpressRouter
