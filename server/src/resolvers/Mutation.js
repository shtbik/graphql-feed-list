const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

const { APP_SECRET, getUserId } = require('../utils')
const { GOOGLE_CLIENT_ID, GOOGLE_BACK_ID } = require('../configs/oauth')

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

	const token = jwt.sign({ userId: user.id }, APP_SECRET)

	return {
		token,
		user,
	}
}

// TODO: need refactoring
async function oAuthLogin(parent, { provider, token: idToken }, context) {
	async function verify() {
		const client = new OAuth2Client(GOOGLE_BACK_ID)

		const ticket = await client.verifyIdToken({
			idToken,
			audience: GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
			// Or, if multiple clients access the backend:
			// [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
		})
		const payload = ticket.getPayload()

		// If request specified a G Suite domain:
		// const domain = payload['hd'];

		const user = await context.prisma.user({ email: payload.email })

		if (!user) {
			const password = await bcrypt.hash('test1234', 10)
			const newUser = await context.prisma.createUser({
				name: payload.name,
				email: payload.email,
				password,
			})
			const token = jwt.sign({ userId: newUser.id }, APP_SECRET)

			return {
				token,
				user: newUser,
			}
		}

		return {
			token: jwt.sign({ userId: user.id }, APP_SECRET),
			user,
		}
	}

	switch (provider) {
		case 'google': {
			const res = await verify().catch(console.error)
			return res
		}

		default:
	}
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
		token: jwt.sign({ userId: user.id }, APP_SECRET),
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
	oAuthLogin,
	login,
	vote,
}
