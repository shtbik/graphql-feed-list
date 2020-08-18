const { readdirSync, readFileSync } = require('fs')
// TODO: remove dependency, find other way to use gql
const { gql } = require('apollo-server')

const typeDefs = [
	gql`
		type Query {
			_empty: String
		}
		type Mutation {
			_empty: String
		}
		type Subscription {
			_empty: String
		}
	`,
]
const resolvers = []

const schemaDir = `${__dirname}/../graphql`
const moduleDirs = readdirSync(schemaDir, { withFileTypes: false })
moduleDirs.forEach(moduleDir => {
	const files = readdirSync(`${schemaDir}/${moduleDir}`, { withFileTypes: true })
	files.forEach(file => {
		const [, extension] = file.name.split('.')
		switch (extension) {
			case 'gql': {
				const schema = readFileSync(`${schemaDir}/${moduleDir}/schema.gql`, { encoding: 'utf8' })

				typeDefs.push(
					gql`
						${schema}
					`
				)
				break
			}
			case 'js':
				resolvers.push(require(`${schemaDir}/${moduleDir}/resolvers.js`))
				break
			default:
				break
		}
	})
})

module.exports = {
	typeDefs,
	resolvers,
}
