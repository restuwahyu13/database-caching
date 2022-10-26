import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { IUsers } from '@interfaces/interface.users'

class DatabaseSchema {
  @Index()
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', nullable: false })
  username!: string

  @Column({ type: 'varchar', nullable: true })
  password!: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date
}

@Entity()
export class Users extends DatabaseSchema implements IUsers {}
