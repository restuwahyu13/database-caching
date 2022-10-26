import { StatusCodes as status } from 'http-status-codes'
import { Request, Response, NextFunction, Handler } from 'express'
import { OutgoingMessage, IncomingHttpHeaders } from 'http'
import { assert } from 'is-any-type'
import { decrypt } from 'jwt-transform'

import { Middleware } from '@helpers/helper.di'
import { apiResponse } from '@helpers/helper.apiResponse'

@Middleware()
export class TransformMiddleware {
  constructor() {}

  use(): Handler {
    return async function (req: Request, res: Response, next: NextFunction): Promise<NextFunction | OutgoingMessage> {
      try {
        let headers: IncomingHttpHeaders = req.headers
        if (!Object.keys(headers).includes('authorization')) throw apiResponse(status.UNAUTHORIZED, 'Authorization required')

        const authorization: boolean | undefined = (headers.authorization as string).includes('Bearer')
        if (!authorization) throw apiResponse(status.UNAUTHORIZED, 'Bearer required')

        const accessToken: string = (headers.authorization as string).split('Bearer ')[1]
        if (assert.isUndefined(accessToken as any)) throw apiResponse(status.UNAUTHORIZED, 'Access Token required')

        const validJwt: string[] = (accessToken as string).split('.')
        if (validJwt?.length !== 3) throw apiResponse(status.UNAUTHORIZED, 'Access Token format must be jwt')

        // overwrite authorization headers
        req.headers.authorization = `Bearer ${decrypt(accessToken, 20)}`

        next()
      } catch (e: any) {
        return res.status(e.stat_code || status.UNAUTHORIZED).json(e)
      }
    }
  }
}
