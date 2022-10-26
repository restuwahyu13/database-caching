import { StatusCodes as status } from 'http-status-codes'
import { Request, Response, NextFunction, Handler } from 'express'
import { OutgoingMessage } from 'http'
import { encrypt } from 'jwt-transform'
import moment from 'moment'

import { Secrets } from '@entities/entitie.secrets'
import { Inject, Middleware, Repository } from '@helpers/helper.di'
import { apiResponse } from '@helpers/helper.apiResponse'
import { JWT } from '@libs/lib.jwt'

@Middleware()
export class AuthMiddleware {
  constructor(@Inject('SecretsModel') private secrets: Repository<Secrets>) {}

  use(): Handler {
    let secrets: Repository<Secrets> = this.secrets

    return async function (req: Request, res: Response, next: NextFunction): Promise<NextFunction | OutgoingMessage> {
      try {
        const accessToken: string = (req.headers.authorization as string).split('Bearer ')[1]

        const decodedToken: Record<string, any> = (await JWT.verifyToken(accessToken)) as any
        if (!decodedToken) throw apiResponse(status.UNAUTHORIZED, 'Access token invalid or expired')

        const getAccessToken: Secrets = await secrets.findOne({ resource_by: decodedToken['id'], resource_type: 'login', access_token: encrypt(accessToken, 20) as string }, { order: { id: 'DESC' } })
        if (!getAccessToken) throw apiResponse(status.UNAUTHORIZED, 'Access token not match')

        if (moment(getAccessToken.expired_at).format() < moment(new Date()).format()) throw apiResponse(status.UNAUTHORIZED, 'Access token expired')
        Object.defineProperty(req, 'user', { value: decodedToken, enumerable: true, writable: true })

        next()
      } catch (e: any) {
        return res.status(e.stat_code || status.UNAUTHORIZED).json(e)
      }
    }
  }
}
