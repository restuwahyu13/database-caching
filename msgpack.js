const jsonpack = require('jsonpack')
const msgpack = require('msgpack-lite')

exports.msgpack = {
	pack(data) {
		const pack = jsonpack.pack(data)
		return msgpack.encode(pack)
	},
	unpack(data) {
		const decode = msgpack.decode(data)
		return jsonpack.unpack(decode)
	}
}
