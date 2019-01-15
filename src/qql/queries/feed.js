import gql from 'graphql-tag'

const GET_FEEDS = gql`
	query feedList {
		feed {
			links {
				id
				createdAt
				url
				description
				postedBy {
					id
					name
				}
				votes {
					id
					user {
						id
					}
				}
			}
		}
	}
`

export default GET_FEEDS
