import { IsOptional, IsNotEmpty, IsString, IsNumberString } from 'class-validator'

export class DTOTodos {
  @IsOptional()
  @IsNumberString()
  id?: number

  @IsNotEmpty({ message: 'title cannot be null' })
  @IsString()
  title!: string

  @IsOptional()
  @IsString()
  description?: string
}

export class DTOTodosId {
  @IsNotEmpty()
  @IsNumberString()
  id!: any
}
