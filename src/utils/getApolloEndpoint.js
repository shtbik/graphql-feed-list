function getApolloURI() {
	switch (process.env.REACT_APP_MODE) {
		case 'local':
			return {
				host: 'localhost:4000',
				ssl: false,
				wss: false,
			}

		case 'prod':
			return {
				host: 'graphql-feed-list-prod.herokuapp.com',
				ssl: true,
				wss: true,
			}

		case 'dev':
		default:
			return {
				host: 'graphql-feed-list-dev.herokuapp.com',
				ssl: true,
				wss: true,
			}
	}
}

export default getApolloURI
