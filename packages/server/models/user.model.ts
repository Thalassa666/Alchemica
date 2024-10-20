import { Model, ModelAttributes } from 'sequelize'
import { DataType } from 'sequelize-typescript'

export type User = {
  id: number
  firstName: string | null
  secondName: string | null
  login: string
  avatar: string | null
}

export const userModel: ModelAttributes<Model, User> = {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataType.STRING,
  },
  secondName: {
    type: DataType.STRING,
  },
  login: {
    type: DataType.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataType.STRING,
  },
}
