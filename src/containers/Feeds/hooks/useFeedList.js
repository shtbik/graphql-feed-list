import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import get from 'lodash/get'

import { GET_FEEDS, NEW_FEEDS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from 'gql/queries/feed'
import { VOTE_MUTATION } from 'gql/mutations/feed'

const useFeedList = () => {
	const [search, setSearch] = useState('')
	const [order] = useState('createdAt_DESC')

	// TODO: add error handler
	const { loading, error, data, subscribeToMore } = useQuery(GET_FEEDS, {
		variables: {
			orderBy: order,
			filter: search,
		},
	})

	const [voteForFeed] = useMutation(VOTE_MUTATION)

	// TODO: subscriptions need refactoring
	useEffect(() => {
		const subscribeToNewFeeds = () =>
			subscribeToMore({
				document: NEW_FEEDS_SUBSCRIPTION,
				updateQuery: (prev, { subscriptionData }) => {
					if (!subscriptionData.data) return prev
					const { newLink } = subscriptionData.data
					const exists = prev.feed.links.find(({ id }) => id === newLink.id)
					if (exists) return prev

					return {
						...prev,
						feed: {
							links: [newLink, ...prev.feed.links],
							count: prev.feed.links.length + 1,
							/* eslint no-underscore-dangle: "off" */
							__typename: prev.feed.__typename,
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
