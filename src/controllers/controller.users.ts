import { Request, Response, Handler, NextFunction } from 'express'
import { OutgoingMessage } from 'http'

import { UsersService } from '@services/service.users'
import { Controller, Inject } from '@helpers/helper.di'
import { APIResponse } from '@helpers/helper.apiResponse'
import { rawParser } from '@helpers/helper.rawParser'

@Controller()
export class UsersController {
  constructor(@Inject('UsersService') private service: UsersService) {}

  usersRegister(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.usersRegister(rawParser(req.body))
        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        return res.status(e.stat_code).json(e)
      }
    }
  }

  usersLogin(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.usersLogin(rawParser(req.body))
        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        return res.status(e.stat_code).json(e)
      }
    }
  }
}
