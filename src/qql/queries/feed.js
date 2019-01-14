import gql from 'graphql-tag'

const GET_FEEDS = gql`
	query feedList {
		feed {
			links {
				id
				createdAt
				url
				description
			}
		}
	}
`

export default GET_FEEDS
