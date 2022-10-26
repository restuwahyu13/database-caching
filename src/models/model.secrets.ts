import { Model, InjectRepository, Repository } from '@helpers/helper.di'
import { Secrets } from '@entities/entitie.secrets'

@Model()
export class SecretsModel {
  constructor(@InjectRepository(Secrets) public model: Repository<Secrets>) {}
}
