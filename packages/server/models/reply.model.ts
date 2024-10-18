import { ModelAttributes } from 'sequelize'
import { Model, DataType } from 'sequelize-typescript'

export type Reply = {
  userId: number
  commentId: number
  content: string
}

export const replyModel: ModelAttributes<Model, Reply> = {
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  commentId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataType.STRING,
    allowNull: false,
  },
}
