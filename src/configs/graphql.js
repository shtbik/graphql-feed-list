import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import { AUTH_TOKEN } from './app'

const httpLink = createHttpLink({
	uri: 'http://localhost:4000',
})

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

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(AUTH_TOKEN)
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	defaultOptions,
})

export default client
