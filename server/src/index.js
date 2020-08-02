const { GraphQLServer } = require('graphql-yoga')
const { makeExecutableSchema } = require('graphql-tools')

const { prisma } = require('./generated/prisma-client')
const { typeDefs, resolvers } = require('./utils/generateSchema')
require('./utils/loadEnv')

const server = new GraphQLServer({
	schema: makeExecutableSchema({
		typeDefs,
		resolvers,
		inheritResolversFromInterfaces: true,
		resolverValidationOptions: {
			requireResolversForResolveType: false,
		},
	}),
	context: request => ({
		...request,
		prisma,
	}),
})

/* eslint no-console: "off" */
server.start(({ port }) => console.log(`Server is running on ${port} port`))
