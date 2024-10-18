import { ModelAttributes } from 'sequelize'
import { Model, DataType } from 'sequelize-typescript'

export type Topic = {
  userId: number
  title: string
}

export const topicModel: ModelAttributes<Model, Topic> = {
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
}
