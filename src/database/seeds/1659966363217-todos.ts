import { Connection, Repository } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import faker from 'faker'

import { Todos } from '@entities/entitie.todos'

export class TodosSeeds implements Seeder {
  async run(_factory: Factory, connection: Connection): Promise<void> {
    if (connection.isConnected) {
      const repository: Repository<Todos> = await connection.getRepository(Todos)
      for (let i = 1; i <= 1000; i++) {
        await repository.insert({ title: faker.lorem.words(20), description: faker.lorem.words(500), created_at: new Date() })
      }
    }
  }
}
