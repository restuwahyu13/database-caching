import { IsNotEmpty, IsString } from 'class-validator'

export class DTOUsersRegister {
  @IsNotEmpty()
  @IsString()
  username!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}

export class DTOUsersLogin {
  @IsNotEmpty()
  @IsString()
  username!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}
