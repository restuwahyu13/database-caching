import { StatusCodes as status } from 'http-status-codes'

import { Users } from '@entities/entitie.users'
import { Secrets } from '@entities/entitie.secrets'
import { Inject, Repository, Service } from '@helpers/helper.di'
import { apiResponse, APIResponse } from '@helpers/helper.apiResponse'
import { JWT } from '@libs/lib.jwt'
import { Bcrypt, IPassword } from '@libs/lib.bcrypt'
import { DTOUsersLogin, DTOUsersRegister } from '@dtos/dto.users'
import { InsertResult } from 'typeorm'
import { expiredAt } from '@helpers/helper.expiredAt'

@Service()
export class UsersService {
  constructor(@Inject('UsersModel') private model: Repository<Users>, @Inject('SecretsModel') private secrets: Repository<Secrets>) {}

  async usersRegister(body: DTOUsersRegister): Promise<APIResponse> {
    try {
      const checkUsername: Users = await this.model.findOne({ username: body.username })
      if (checkUsername) throw apiResponse(status.BAD_REQUEST, `User username ${body.username} already exist`)

      body.password = Bcrypt.hashPassword(body.password)

      const addUser: InsertResult = await this.model.insert(body)
      if (!addUser) throw apiResponse(status.BAD_REQUEST, 'Created new user failed')

      return apiResponse(status.OK, 'Created new user success')
    } catch (e: any) {
      return apiResponse(e.stat_code || status.BAD_REQUEST, e.stat_msg || e.message)
    }
  }

  async usersLogin(body: DTOUsersLogin): Promise<APIResponse> {
    try {
      const checkUsername: Users = await this.model.findOne({ username: body.username })
      if (!checkUsername) throw apiResponse(status.BAD_REQUEST, `User username ${body.username} not exist`)

      const comparePassword: IPassword = await Bcrypt.comparePassword(body.password, checkUsername.password)
      if (!comparePassword.success) throw apiResponse(status.BAD_REQUEST, `User username ${body.username} or password ${body.password} wrong`)

      const jwtPayload: Record<string, any> = {
        id: checkUsername.id,
        username: checkUsername.username
      }

      const jwtToken: Record<string, any> = JWT.signToken(jwtPayload, { expiredAt: 1, type: 'days' })
      const accessToken: string = jwtToken.accessToken
      const refreshToken: string = jwtToken.refreshToken

      await this.secrets.insert({ resource_by: checkUsername.id, resource_type: 'login', access_token: accessToken, refresh_token: refreshToken, expired_at: expiredAt(1, 'days') })

      return apiResponse(status.OK, 'users login', jwtToken)
    } catch (e: any) {
      return apiResponse(e.stat_code || status.BAD_REQUEST, e.stat_msg || e.message)
    }
  }
}
