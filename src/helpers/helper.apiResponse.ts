export interface APIResponse {
  stat_code: number
  stat_msg: string
  data?: Record<string, any> | Array<Record<string, any>>
  pagination?: Record<string, any>
}

export const apiResponse = (code: number, message: string, data?: Record<string, any> | Array<Record<string, any>>, pagination?: Record<string, any>): APIResponse => {
  if (data == null && pagination == null) return { stat_code: code, stat_msg: message }
  else return { stat_code: code, stat_msg: message, pagination, data }
}
