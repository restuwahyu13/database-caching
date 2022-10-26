import IORedis from 'ioredis'
import { Msgpack } from '@libs/lib.msgpack'

export class Redis {
  private db: number

  constructor(db: number) {
    this.setDB(db)
  }

  private setDB(db: number) {
    this.db = db
  }

  private getDB(): number {
    return this.db
  }

  private redis(): IORedis.Redis {
    return new IORedis({
      host: process.env.REDIS_HOST as string,
      port: parseInt(process.env.REDIS_PORT as any),
      password: process.env.REDIS_PASSWORD,
      enableAutoPipelining: true,
      enableOfflineQueue: true,
      noDelay: true,
      db: +this.getDB()
    })
  }

  async existCacheData(key: string): Promise<number> {
    const res: number = await this.redis().exists(key)
    return res
  }

  async hexistCacheData(key: string, field: string): Promise<IORedis.BooleanResponse> {
    const res: IORedis.BooleanResponse = await this.redis().hexists(key, field)
    return res
  }

  async delCacheData(key: string): Promise<number> {
    const res: number = await this.redis().del(key)
    return res
  }

  async hdelCacheData(key: string, field: string): Promise<number> {
    const res: number = await this.redis().hdel(key, field)
    return res
  }

  async setCacheData(key: string, data: Record<string, any> | Record<string, any>[], type: 'json' | 'buffer'): Promise<number | Buffer> {
    await this.redis().expire(key, 3600)
    let res: any
    if (type == 'json') res = await this.redis().set(key, JSON.stringify(data))
    if (type == 'buffer') res = await this.redis().setBuffer(key, Msgpack.pack(data))
    return res
  }

  async hsetCacheData(key: string, field: string, data: Record<string, any> | Record<string, any>[], type: 'json' | 'buffer'): Promise<number | Buffer> {
    await this.redis().expire(key, 3600)
    let res: any
    if (type == 'json') res = await this.redis().hset(key, field, JSON.stringify(data))
    if (type == 'buffer') res = await this.redis().hsetBuffer(key, field, Msgpack.pack(data))
    return res
  }

  async getCacheData(key: string, type: 'json' | 'buffer'): Promise<number | Buffer> {
    let res: any
    if (type == 'json') res = await this.redis().get(key)
    if (type == 'buffer') res = await this.redis().getBuffer(key)
    return res
  }

  async hgetCacheData(key: string, field: string, type: 'json' | 'buffer'): Promise<any> {
    let res: any
    if (type == 'json') res = JSON.parse(await this.redis().hget(key, field))
    if (type == 'buffer') res = Msgpack.unpack(await this.redis().hgetBuffer(key, field))
    return res
  }
}
