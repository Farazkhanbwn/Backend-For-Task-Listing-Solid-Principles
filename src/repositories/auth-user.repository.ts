import { injectable } from 'inversify'
import User from '../api/auth/auth-model'
import { encryptTextData, isEncryptedDataValid } from '../utils/encryptionUtils'

@injectable()
class AuthUserRepository {
  private authUserModel

  constructor() {
    this.authUserModel = User
  }

  login = async (email: string, password: string) => {
    const user = await this.authUserModel.findOne({ email }).select('-updatedAt -__v').lean()
    const isPasswordValid = !!user && isEncryptedDataValid(password, user?.password)

    if (!user || !isPasswordValid) {
      return {
        error: 'incorrect email and password',
        data: null,
      }
    }
    return user
  }

  signUp = async (email: string, password: string) => {
    const user = await User.findOne({
      email,
    })

    if (user) {
      return {
        data: null,
        error: 'User Already Exist',
      }
    }

    const hashPassword = await encryptTextData(password)

    const createdUser = new this.authUserModel({ email, password: hashPassword })
    await createdUser.save()
    return {
      email,
      password,
    }
  }
}

export default AuthUserRepository
