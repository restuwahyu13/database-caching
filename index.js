const Redis = require('ioredis')
const axios = require('axios')
const express = require('express')
const http = require('http')
const { msgpack } = require('./msgpack')

const app = express()
const server = http.createServer(app)
const redis = new Redis()

let commentsUrl = ' https://jsonplaceholder.typicode.com/comments'
let albumsUrl = ' https://jsonplaceholder.typicode.com/albums'
let photosUrl = ' https://jsonplaceholder.typicode.com/photos'
let postsUrl = ' https://jsonplaceholder.typicode.com/posts'
let todosUrl = ' https://jsonplaceholder.typicode.com/todos'
let usersUrl = ' https://jsonplaceholder.typicode.com/users'

app.get('/jph', async (req, res, next) => {
	try {
		const [comments, albums, photos, posts, todos, users] = await Promise.all([
			axios.get(commentsUrl),
			axios.get(albumsUrl),
			axios.get(photosUrl),
			axios.get(postsUrl),
			axios.get(todosUrl),
			axios.get(usersUrl)
		])
		const data = { comments: comments.data, albums: albums.data, photos: photos.data, posts: posts.data, todos: todos.data, users: users.data }

		return res.status(200).json({ msg: 'success', data: data })
	} catch (e) {
		console.error(e)
		return res.status(500).json({ msg: 'Internal server error' || e.message })
	}
})

app.get('/jph-cache-json', async (req, res, next) => {
	try {
		const keys = await redis.exists('cache:photos:json')

		if (!keys) {
			const [comments, albums, photos, posts, todos, users] = await Promise.all([
				axios.get(commentsUrl),
				axios.get(albumsUrl),
				axios.get(photosUrl),
				axios.get(postsUrl),
				axios.get(todosUrl),
				axios.get(usersUrl)
			])
			const data = { comments: comments.data, albums: albums.data, photos: photos.data, posts: posts.data, todos: todos.data, users: users.data }

			await redis.expire('cache:jph:json', 3600)
			await redis.hset('cache:jph:json', { jph: JSON.stringify(data) })

			return res.status(200).json({ msg: 'success', data: data })
		} else {
			const jph = await redis.hget('cache:jph:json', 'jph')
			const data = JSON.parse(jph)

			return res.status(200).json({ msg: 'success', data: data })
		}
	} catch (e) {
		console.error(e)
		return res.status(500).json({ msg: 'Internal server error' || e.message })
	}
})

app.get('/jph-cache-msgpack', async (req, res, next) => {
	try {
		const keys = await redis.exists('cache:jph:msgpack')

		if (!keys) {
			const [comments, albums, photos, posts, todos, users] = await Promise.all([
				axios.get(commentsUrl),
				axios.get(albumsUrl),
				axios.get(photosUrl),
				axios.get(postsUrl),
				axios.get(todosUrl),
				axios.get(usersUrl)
			])
			const data = { comments: comments.data, albums: albums.data, photos: photos.data, posts: posts.data, todos: todos.data, users: users.data }

			await redis.expire('cache:jph:msgpack', 3600)
			await redis.hset('cache:jph:msgpack', { jph: msgpack.pack(data) })

			return res.status(200).json({ msg: 'success', data: data })
		} else {
			const jph = await redis.hgetBuffer('cache:jph:msgpack', 'jph')
			const data = msgpack.unpack(jph)

			return res.status(200).json({ msg: 'success', data: data })
		}
	} catch (e) {
		console.error(e)
		return res.status(500).json({ msg: 'Internal server error' || e.message })
	}
})

server.listen(4000, () => console.log(`server is running on port ${server.address().port}`))
