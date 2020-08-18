const jwt = require('jsonwebtoken')

function getUserId(context) {
	const Authorization = context.request.get('Authorization')
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '')
		const { userId } = jwt.verify(token, process.env.APP_SECRET)
		return userId
	}

	throw new Error('Not authenticated')
}

function getToken({ id: userId }) {
	return jwt.sign({ userId }, process.env.APP_SECRET)
}

function generatePassword(options = {}) {
	const {
		length = 8,
		charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
	} = options

	let retVal = ''
	for (let i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n))
	}
	return retVal
}

module.exports = {
	getUserId,
	getToken,
	generatePassword,
}
