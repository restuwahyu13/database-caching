import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { ITodos } from '@interfaces/interface.todos'

class DatabaseSchema {
  @Index()
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', nullable: false })
  title!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date
}

@Entity()
export class Todos extends DatabaseSchema implements ITodos {}
