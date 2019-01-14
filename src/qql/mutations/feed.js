import gql from 'graphql-tag'

const ADD_FEED = gql`
	mutation addFeed($description: String!, $url: String!) {
		post(description: $description, url: $url) {
			id
			createdAt
			url
			description
		}
	}
`
export default ADD_FEED
