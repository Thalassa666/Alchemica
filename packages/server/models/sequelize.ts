import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { AsKey, ForeignKey } from './alias'
import { commentModel } from './comment.model'
import { replyModel } from './reply.model'
import { topicModel } from './topic.model'
import { userModel } from './user.model'

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env

const options: SequelizeOptions = {
  host: POSTGRES_HOST ?? 'localhost',
  port: POSTGRES_PORT ? Number(POSTGRES_PORT) : 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  define: {
    underscored: false,
  },
}

const sequelize = new Sequelize(options)

export const TopicModel = sequelize.define('Topic', topicModel, {})
export const CommentModel = sequelize.define('Comment', commentModel, {})
export const ReplyModel = sequelize.define('Reply', replyModel)
export const UserModel = sequelize.define('User', userModel, {})

TopicModel.belongsTo(UserModel, {
  as: AsKey.User,
  foreignKey: ForeignKey.UserId,
})
TopicModel.hasMany(CommentModel, {
  as: AsKey.Comments,
  foreignKey: ForeignKey.TopicId,
})

CommentModel.belongsTo(TopicModel, {
  as: AsKey.Topic,
  foreignKey: ForeignKey.TopicId,
})
CommentModel.belongsTo(UserModel, {
  as: AsKey.User,
  foreignKey: ForeignKey.UserId,
})
CommentModel.hasMany(ReplyModel, {
  as: AsKey.Replies,
  foreignKey: ForeignKey.CommentId,
})

ReplyModel.belongsTo(CommentModel, {
  as: AsKey.Comment,
  foreignKey: ForeignKey.CommentId,
})
ReplyModel.belongsTo(UserModel, {
  as: AsKey.User,
  foreignKey: ForeignKey.UserId,
})

UserModel.hasMany(TopicModel, {
  as: AsKey.Topics,
  foreignKey: ForeignKey.UserId,
})
UserModel.hasMany(CommentModel, {
  as: AsKey.Comments,
  foreignKey: ForeignKey.UserId,
})
UserModel.hasMany(ReplyModel, {
  as: AsKey.Replies,
  foreignKey: ForeignKey.UserId,
})

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
