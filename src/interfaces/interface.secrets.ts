export interface ISecrets {
  id: number
  resource_by: number
  resource_type: string
  access_token: string
  refresh_token?: string
  extra_token?: string
  expired_at: Date
  created_at?: Date
}
