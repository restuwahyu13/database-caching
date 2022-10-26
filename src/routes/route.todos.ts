import { Inject, Route, Router } from '@helpers/helper.di'
import { TodosController } from '@controllers/controller.todos'
import { TransformMiddleware } from '@middlewares/middleware.jwtTransform'
import { AuthMiddleware } from '@middlewares/middleware.auth'
import { ValidatorMiddleware } from '@middlewares/middleware.validator'
import { DTOTodos, DTOTodosId } from '@dtos/dto.todos'

@Route()
export class TodosRoute {
  private router: Router

  constructor(
    @Inject('TodosController') private controller: TodosController,
    @Inject('TransformMiddleware') private transform: TransformMiddleware,
    @Inject('AuthMiddleware') private auth: AuthMiddleware,
    @Inject('ValidatorMiddleware') private validator: ValidatorMiddleware
  ) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/', [this.transform.use(), this.auth.use(), this.validator.use(DTOTodos)], this.controller.createTodos())
    this.router.get('/', [this.transform.use(), this.auth.use()], this.controller.getAllTodos())
    this.router.get('/:id', [this.transform.use(), this.auth.use(), this.validator.use(DTOTodosId)], this.controller.getTodosById())
    this.router.delete('/:id', [this.transform.use(), this.auth.use(), this.validator.use(DTOTodosId)], this.controller.deleteTodosById())
    this.router.patch('/:id', [this.transform.use(), this.auth.use(), this.validator.use(DTOTodos)], this.controller.updateTodosById())

    return this.router
  }
}
