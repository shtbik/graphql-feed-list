function getApolloURI() {
	switch (process.env.REACT_APP_GQL_MODE) {
		case 'local':
			return {
				host: 'localhost:4000',
				ssl: false,
				wss: false,
			}

		case 'development':
		default:
			return {
				host: 'graphql-feed-list.herokuapp.com',
				ssl: true,
				wss: true,
			}
	}
}

export default getApolloURI
