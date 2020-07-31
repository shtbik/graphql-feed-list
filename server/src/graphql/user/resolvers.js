const bcrypt = require('bcryptjs')
const { omit } = require('lodash')

const { getToken, generatePassword } = require('../../utils/user')
const { googleVerify } = require('../../utils/oAuth')

const getVerifyPromise = provider => {
	switch (provider) {
		case 'google':
			return googleVerify

		default:
			return null
	}
}

const resolvers = {
	Mutation: {
		login: async (parent, args, context) => {
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
		},

		signup: async (parent, args, context) => {
			const password = await bcrypt.hash(args.password, 10)
			const user = await context.prisma.createUser({ ...args, password })

			const token = getToken(user)

			return {
				token,
				user,
			}
		},

		oAuth: async (parent, { provider, token }, context) => {
			async function authentication(user) {
				// TODO: change return value to Apollo Error
				if (!user) throw new Error('Something happend')

				const { email, name } = user
				const existUser = await context.prisma.user({ email })

				if (existUser)
					return {
						token: getToken(existUser),
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
		},
	},

	User: {
		links: async (parent, args, context) => {
			return context.prisma.user({ id: parent.id }).links()
		},
	},
}

module.exports = resolvers
