import msgpack from 'msgpack-lite'

export class Msgpack {
  static pack(data: Record<string, any> | Record<string, any>[]): Buffer {
    return msgpack.encode(data)
  }

  static unpack(data: Buffer | Uint8Array | number[]): any {
    return msgpack.decode(data)
  }
}
