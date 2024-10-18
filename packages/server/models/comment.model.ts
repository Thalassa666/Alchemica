import { ModelAttributes } from 'sequelize'
import { Model, DataType } from 'sequelize-typescript'

export type Comment = {
  userId: number
  topicId: number
  content: string
}

export const commentModel: ModelAttributes<Model, Comment> = {
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  topicId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataType.STRING,
    allowNull: false,
  },
}
