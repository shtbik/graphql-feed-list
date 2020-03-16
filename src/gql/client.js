import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import getApolloURI from 'utils/getApolloEndpoint'
import { AUTH_TOKEN } from 'configs/consts'

const { host, ssl, wss } = getApolloURI()

const defaultOptions = {
	watchQuery: {
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'all',
	},
	query: {
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'all',
	},
	mutate: {
		errorPolicy: 'all',
	},
}

const httpLink = createHttpLink({
	uri: `${ssl ? 'https' : 'http'}://${host}`,
})

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
	uri: `${wss ? 'wss' : 'ws'}://${host}`,
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
