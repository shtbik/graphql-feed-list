const { getUserId } = require('../../utils/user')

const resolvers = {
	Mutation: {
		vote: async (parent, args, context) => {
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
		},
	},
	Subscription: {
		newVote: {
			subscribe: (parent, args, context) =>
				context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node(),
			resolve: payload => payload,
		},
	},

	Vote: {
		user: async (parent, args, context) => {
			return context.prisma.vote({ id: parent.id }).user()
		},
		link: async (parent, args, context) => {
			return context.prisma.vote({ id: parent.id }).link()
		},
	},
}

module.exports = resolvers
