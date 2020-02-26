function getApolloURI() {
	switch (process.env.REACT_APP_GQL_MODE) {
		case 'development':
			return {
				host: 'eu1.prisma.sh/alexander-shtykov-ca308e/prisma/dev',
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
