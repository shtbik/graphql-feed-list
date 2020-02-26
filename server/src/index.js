const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')

const resolvers = {
	Query,
	Mutation,
	Subscription,
	User,
	Link,
	Vote,
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: request => ({
		...request,
		db: new Prisma({
			typeDefs: 'src/generated/prisma-client/prisma.graphql', // the generated Prisma DB schema
			endpoint: 'https://eu1.prisma.sh/alexander-shtykov-ca308e/prisma/dev', // the endpoint of the Prisma DB service
			debug: true, // log all GraphQL queries & mutations
		}),
	}),
})

server.start(({ port }) => console.log(`Server is running on ${port} port`))
