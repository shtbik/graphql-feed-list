const { getUserId } = require('../../utils/user')

const resolvers = {
	Query: {
		feed: async (parent, args, context) => {
			const count = await context.prisma
				.linksConnection({
					where: {
						OR: [{ description_contains: args.filter }, { url_contains: args.filter }],
					},
				})
				.aggregate()
				.count()
			const links = await context.prisma.links({
				where: {
					OR: [{ description_contains: args.filter }, { url_contains: args.filter }],
				},
				skip: args.skip,
				first: args.first,
				orderBy: args.orderBy,
			})

			return {
				count,
				links,
			}
		},
	},
	Mutation: {
		post: (parent, args, context) => {
			const userId = getUserId(context)
			return context.prisma.createLink({
				url: args.url,
				description: args.description,
				createdAt: new Date(),
				postedBy: { connect: { id: userId } },
			})
		},
	},
	Subscription: {
		newLink: {
			subscribe: (parent, args, context) =>
				context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node(),
			resolve: payload => payload,
		},
	},

	Link: {
		votes: (parent, args, context) => {
			return context.prisma.link({ id: parent.id }).votes()
		},
		postedBy: async (parent, args, context) => {
			return context.prisma.link({ id: parent.id }).postedBy()
		},
	},
}

module.exports = resolvers
