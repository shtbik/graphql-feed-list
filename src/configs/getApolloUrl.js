function getApolloURI() {
	switch (process.env.REACT_APP_GQL_MODE) {
		case 'development':
			return {
				host: 'graphql-feed-list.herokuapp.com',
				ssl: true,
				wss: true,
			}

		default:
			return {
				host: 'localhost:4000',
				ssl: false,
				wss: false,
			}
	}
}

export default getApolloURI
