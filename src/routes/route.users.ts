import { Inject, Route, Router } from '@helpers/helper.di'
import { UsersController } from '@controllers/controller.users'
import { ValidatorMiddleware } from '@middlewares/middleware.validator'
import { DTOUsersLogin, DTOUsersRegister } from '@dtos/dto.users'

@Route()
export class UsersRoute {
  private router: Router

  constructor(@Inject('UsersController') private controller: UsersController, @Inject('ValidatorMiddleware') private validator: ValidatorMiddleware) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/register', [this.validator.use(DTOUsersRegister)], this.controller.usersRegister())
    this.router.post('/login', [this.validator.use(DTOUsersLogin)], this.controller.usersLogin())

    return this.router
  }
}
