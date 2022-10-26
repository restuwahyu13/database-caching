import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { ISecrets } from '@interfaces/interface.secrets'

class DatabaseSchema {
  @Index()
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int', nullable: false })
  resource_by!: number

  @Column({ type: 'varchar', nullable: false })
  resource_type!: string

  @Column({ type: 'text', nullable: false })
  access_token!: string

  @Column({ type: 'text', nullable: true })
  refresh_token?: string

  @Column({ type: 'timestamptz', nullable: false })
  expired_at!: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date
}

@Entity()
export class Secrets extends DatabaseSchema implements ISecrets {}
