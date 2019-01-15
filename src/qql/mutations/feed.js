import gql from 'graphql-tag'

const ADD_FEED = gql`
	mutation addFeed($description: String!, $url: String!) {
		post(description: $description, url: $url) {
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
`

const VOTE_MUTATION = gql`
	mutation voteForFeed($linkId: ID!) {
		vote(linkId: $linkId) {
			id
			link {
				id
				votes {
					id
					user {
						id
					}
				}
			}
			user {
				id
			}
		}
	}
`

export { ADD_FEED, VOTE_MUTATION }
