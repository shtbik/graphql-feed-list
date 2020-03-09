import gql from 'graphql-tag'

// TODO: add fragments
// move to .gql files

/* eslint no-unused-vars: "off" */
const LinkOrderByInput = gql`
	enum LinkOrderByInput {
		description_ASC
		description_DESC
		url_ASC
		url_DESC
		createdAt_ASC
		createdAt_DESC
	}
`

const GET_FEEDS = gql`
	query feedList($orderBy: LinkOrderByInput, $filter: String) {
		feed(orderBy: $orderBy, filter: $filter) {
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

const NEW_FEEDS_SUBSCRIPTION = gql`
	subscription {
		newLink {
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
`

const NEW_VOTES_SUBSCRIPTION = gql`
	subscription {
		newVote {
			id
			link {
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
			user {
				id
			}
		}
	}
`

export { GET_FEEDS, NEW_FEEDS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION }
