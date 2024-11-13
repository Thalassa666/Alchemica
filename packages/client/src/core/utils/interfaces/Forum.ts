import { IUser } from './User'

export interface IForumGetParams {
  cursor: number
  limit: number
}

export interface IForumGetTopics {
  alchemyGameScore: number
  startedAt: number
  endedAt: number
  user: IUser
}

export interface IForumGetTopic {
  alchemyGameScore: number
  startedAt: number
  endedAt: number
  user: IUser
}

export interface ITopic {
  user: {
    id: number
    firstName: string
    secondName: string
    login: string
    avatar: string | null
  }
  title: string
}

export interface IComment {
  user: {
    id: number
    firstName: string
    secondName: string
    login: string
    avatar: string | null
  }
  content: string
  topicId: number
}

export interface ICommentResponse {
  content: string
  createdAt: string
  id: number
  replies: []
  topicId: number
  updatedAt: string
  user?: {
    id: number
    firstName: string
    secondName: string
    login: string
    avatar: string | null
  }
  userId: number
}

export interface ITopicResponse {
  createdAt: string
  id: number
  title: string
  updatedAt: string
  userId: number
  comments?: [any]
  user?: {
    id: number
    firstName: string
    secondName: string
    login: string
    avatar: string | null
  }
  messages?: null | ICommentResponse[]
  topicId?: number
}
