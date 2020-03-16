import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import get from 'lodash/get'

import { GET_FEEDS, NEW_FEEDS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from 'gql/queries/feed'
import { VOTE_MUTATION } from 'gql/mutations/feed'

export const initialValues = {
	filter: '',
	orderBy: 'createdAt_DESC',
}

const useFeedList = () => {
	const [search, setSearch] = useState(initialValues.filter)
	const [order] = useState(initialValues.orderBy)

	// TODO: add global error handler
	const { loading, error, data, subscribeToMore } = useQuery(GET_FEEDS, {
		variables: {
			filter: search,
			orderBy: order,
		},
		fetchPolicy: 'cache-first',
	})

	const [voteForFeed] = useMutation(VOTE_MUTATION)

	useEffect(() => {
		const subscribeToNewFeeds = () =>
			subscribeToMore({
				document: NEW_FEEDS_SUBSCRIPTION,
				updateQuery: (prev, { subscriptionData }) => {
					if (!subscriptionData.data) return prev
					const { newLink } = subscriptionData.data
					const { links, __typename: typename } = prev.feed
					const exists = links.find(({ id }) => id === newLink.id)
					if (exists) return prev

					return {
						...prev,
						feed: {
							links: [newLink, ...links],
							count: links.length + 1,
							__typename: typename,
						},
					}
				},
			})

		const subscribeToNewVotes = () =>
			subscribeToMore({
				document: NEW_VOTES_SUBSCRIPTION,
			})

		subscribeToNewFeeds()
		subscribeToNewVotes()
	}, [subscribeToMore])

	return {
		loading,
		error,
		data: get(data, ['feed', 'links']),
		setSearch,
		voteForFeed,
	}
}

export default useFeedList
