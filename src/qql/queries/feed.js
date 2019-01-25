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

const FEED_SEARCH_QUERY = gql`
	query feedSearchQuery($filter: String!) {
		feed(filter: $filter) {
			links {
				id
				url
				description
				createdAt
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

export { GET_FEEDS, FEED_SEARCH_QUERY }
