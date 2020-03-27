import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import get from 'lodash/get'

import { GET_FEEDS, NEW_FEEDS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from 'gql/queries/feed'
import { VOTE_MUTATION } from 'gql/mutations/feed'

export const defaultPageSize = 12

export const initialValues = {
	filter: '',
	orderBy: 'createdAt_DESC',
	first: defaultPageSize,
	skip: 0,
}

const useFeedList = () => {
	const [search, setSearch] = useState(initialValues.filter)
	const [order] = useState(initialValues.orderBy)
	const [first] = useState(initialValues.first)
	const [skip, setSkip] = useState(initialValues.skip)

	const variables = {
		filter: search,
		orderBy: order,
		first,
	}

	// TODO: add global error handler
	const { loading, error, data: res, fetchMore, subscribeToMore } = useQuery(GET_FEEDS, {
		variables: {
			...variables,
			skip: 0,
		},
		fetchPolicy: 'cache-first',
	})

	const data = get(res, ['feed', 'links']) || []
	const total = get(res, ['feed', 'count'])

	function fetchMoreFeeds(__loading, setFetchMoreLoading) {
		const nextSkipValue = skip + defaultPageSize
		if (data.length === total) {
			setFetchMoreLoading(false)
			return false
		}

		return fetchMore({
			variables: { ...variables, skip: nextSkipValue },
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult.feed) return prev
				const {
					feed: { count, links: nextLinks },
				} = fetchMoreResult
				const {
					feed: { links, __typename: typename },
				} = prev

				return { ...prev, feed: { links: links.concat(nextLinks), count, __typename: typename } }
			},
		})
			.then(() => setSkip(nextSkipValue))
			.finally(() => {
				setFetchMoreLoading(false)
			})
	}

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
		data,
		total,
		fetchMore: fetchMoreFeeds,
		setSearch,
		voteForFeed,
	}
}

export default useFeedList
