import { Model, InjectRepository, Repository } from '@helpers/helper.di'
import { Todos } from '@entities/entitie.todos'

@Model()
export class TodosModel {
  constructor(@InjectRepository(Todos) public model: Repository<Todos>) {}
}
