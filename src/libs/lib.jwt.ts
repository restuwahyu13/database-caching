import { encrypt } from 'jwt-transform'
import jwt from 'jsonwebtoken'

import { ExpressError } from '@helpers/helper.error'
import { convertTime } from '@helpers/helper.convertTime'

let secretKey: string = process.env.JWT_SECRET_KEY || ''
let typeTime: Record<string, any> = {
  days: 'd',
  minute: 'm',
  second: 's'
}

export interface IToken {
  accessToken: string
  refreshToken: string
  accessTokenExpired: string
  refreshTokenExpired: string
}

export interface ITokenMixed {
  accessToken: string
  refreshToken: string
  accessTokenExpired: string
  refreshTokenExpired: string
  status: string
}

interface Ioptions {
  expiredAt: number
  type: string
}

export class JWT {
  static signToken(data: Record<string, any>, options: Ioptions): IToken | Error {
    try {
      const accessToken: string = jwt.sign({ ...data }, secretKey, { expiresIn: `${options.expiredAt}${typeTime[options.type]}`, audience: 'node-app' })
      const refreshToken: string = jwt.sign({ ...data }, secretKey, { expiresIn: '30d', audience: 'node-app' })

      const token: IToken = {
        accessToken: encrypt(accessToken, 20) as string,
        refreshToken: encrypt(refreshToken, 20) as string,
        accessTokenExpired: `${convertTime(options.expiredAt, 'days')} Days`,
        refreshTokenExpired: `${convertTime(30, 'days')} Days`
      }

      return token
    } catch (e: any) {
      return new ExpressError(e.message || 'Generate accessToken and refreshToken failed')
    }
  }

  static verifyToken(accessToken: string): jwt.JwtPayload | string | Error {
    try {
      const decodedToken: string | jwt.JwtPayload = jwt.verify(accessToken, secretKey, { audience: 'node-app' })
      return decodedToken
    } catch (e: any) {
      return new ExpressError(e.message || 'Verified accessToken expired or invalid')
    }
  }
}
