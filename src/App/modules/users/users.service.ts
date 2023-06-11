import { User } from './users.model'
import { IUser } from './users.interface'
import config from '../../../config/index'
import { generatedUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //we need auto generated incremental id and default password

  const id = await generatedUserId()

  user.id = id

  if (!user.password) {
    user.password = config.default_user_password as string
  }

  const createdUser = await User.create(user)
  if (!createUser) {
    throw new Error('failed to create user!')
  }
  return createdUser
}

export default {
  createUser,
}
