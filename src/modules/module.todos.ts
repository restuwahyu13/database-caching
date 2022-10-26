import { Module, Injectable, Inject, Context, ObjectLiteral } from '@helpers/helper.di'
import { TodosService } from '@services/service.todos'
import { TodosController } from '@controllers/controller.todos'
import { TodosRoute } from '@routes/route.todos'
import { TodosModel } from '@models/model.todos'

@Module([
  { token: 'TodosService', useClass: TodosService },
  { token: 'TodosController', useClass: TodosController },
  { token: 'TodosRoute', useClass: TodosRoute },
  {
    token: 'TodosModel',
    useFactory: (): ObjectLiteral => {
      return Context.get(TodosModel).model
    }
  }
])
@Injectable()
export class TodosModule {
  constructor(@Inject('TodosRoute') public route: TodosRoute) {}
}
