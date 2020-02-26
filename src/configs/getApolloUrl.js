function getApolloURI() {
	switch (process.env.REACT_APP_GQL_MODE) {
		case 'development':
			return {
				host: 'graphql-feed-list.herokuapp.com',
				protocol: 'https',
			}

		default:
			return {
				host: 'localhost:4000',
				protocol: 'http',
			}
	}
}

export default getApolloURI