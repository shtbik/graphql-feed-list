const bcrypt = require('bcryptjs')
const { omit } = require('lodash')

const { getToken, getUserId, generatePassword } = require('../utils/user')
const { googleVerify } = require('../utils/oAuth')

function post(parent, args, context) {
	const userId = getUserId(context)
	return context.prisma.createLink({
		url: args.url,
		description: args.description,
		createdAt: new Date(),
		postedBy: { connect: { id: userId } },
	})
}

async function signup(parent, args, context) {
	const password = await bcrypt.hash(args.password, 10)
	const user = await context.prisma.createUser({ ...args, password })

	const token = getToken(user)

	return {
		token,
		user,
	}
}

function getVerifyPromise(provider) {
	switch (provider) {
		case 'google':
			return googleVerify

		default:
			return null
	}
}

async function oAuth(parent, { provider, token }, context) {
	async function authentication(user) {
		// TODO: change return value to Apollo Error
		if (!user) throw new Error('Something happend')

		const { email, name } = user
		const existUser = await context.prisma.user({ email })

		if (existUser)
			return {
				token: getToken(user),
				user: omit(existUser, ['password']),
			}

		const password = await bcrypt.hash(generatePassword(), 10)
		const newUser = await context.prisma.createUser({
			name,
			email,
			password,
		})

		return {
			token: getToken(newUser),
			user: newUser,
		}
	}

	const verifyPromise = getVerifyPromise(provider)
	const userPayload = await verifyPromise(token)

	const userRes = await authentication(userPayload)
	return userRes
}

async function login(parent, args, context) {
	const user = await context.prisma.user({ email: args.email })
	if (!user) {
		throw new Error('No such user found')
	}

	const valid = await bcrypt.compare(args.password, user.password)
	if (!valid) {
		throw new Error('Invalid password')
	}

	return {
		token: getToken(user),
		user,
	}
}

async function vote(parent, args, context) {
	const userId = getUserId(context)
	const linkExists = await context.prisma.$exists.vote({
		user: { id: userId },
		link: { id: args.linkId },
	})
	if (linkExists) {
		throw new Error(`Already voted for link: ${args.linkId}`)
	}

	return context.prisma.createVote({
		user: { connect: { id: userId } },
		link: { connect: { id: args.linkId } },
	})
}

module.exports = {
	post,
	signup,
	oAuth,
	login,
	vote,
}
