import { controller, httpGet, httpPost, interfaces } from 'inversify-express-utils'
import AuthUserRepository from '../../repositories/auth-user.repository'
import { withErrorHandler } from '../../utils/utils'
import { Request, Response } from 'express'

@controller('/auth')
class AuthController implements interfaces.Controller {
  constructor(private authUserRepository: AuthUserRepository) {}

  @withErrorHandler
  @httpPost('/signUp')
  async signupUser(req: Request, res: Response) {
    const { email, password } = req?.body

    if (!email || !password) {
      throw new Error('Invalid Data')
    }

    const newRecord = await this.authUserRepository.signUp(email, password)
    return res.json(newRecord)
  }

  @withErrorHandler
  @httpPost('/login')
  async loginUser(req: Request, res: Response) {
    const { email, password } = req?.body

    if (!email || !password) {
      throw new Error('Invalid Data')
    }

    const newRecord = await this.authUserRepository.login(email, password)
    console.log('new Record is : ', newRecord)
    return res.json(newRecord)
  }
}

export default AuthController
