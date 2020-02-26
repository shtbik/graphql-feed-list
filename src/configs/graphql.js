import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import getApolloURI from './getApolloUrl'
import { AUTH_TOKEN } from './app'

const { host, protocol } = getApolloURI()

const httpLink = createHttpLink({
	uri: `${protocol}://${host}`,
})

const defaultOptions = {
	watchQuery: {
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'all',
	},
	query: {
		errorPolicy: 'all',
	},
	mutate: {
		errorPolicy: 'all',
	},
}

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(AUTH_TOKEN)
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

const wsLink = new WebSocketLink({
	uri: `ws://${host}`,
	options: {
		reconnect: true,
		connectionParams: {
			authToken: localStorage.getItem(AUTH_TOKEN),
		},
	},
})

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	authLink.concat(httpLink)
)

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
	defaultOptions,
})

export default client
