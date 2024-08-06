import { Container } from 'inversify'
// import IndexController from '../api/home/home.controller'
import AuthController from '../api/auth/auth-controller'

export const inversifyContainer = new Container({ autoBindInjectable: true, defaultScope: 'Singleton' })

// inversifyContainer.bind<IndexController>(IndexController).to(IndexController).inSingletonScope()
inversifyContainer.bind<AuthController>(AuthController).to(AuthController).inSingletonScope()
