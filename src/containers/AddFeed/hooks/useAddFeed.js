import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { ADD_FEED } from 'gql/mutations/feed'
import { GET_FEEDS } from 'gql/queries/feed'

import { initialValues as defaultVariables } from '../../Feeds/hooks/useFeedList'

const useAddFeed = () => {
	const [url, setUrl] = useState('')
	const [description, setDescription] = useState('')

	const handleReset = () => {
		setUrl('')
		setDescription('')
	}

	// TODO: item will be added to cache, but GET_FEEDS will be called one more time
	// need to fix
	const [addFeed] = useMutation(ADD_FEED, {
		update: (store, { data: { post } }) => {
			try {
				const data = store.readQuery({ query: GET_FEEDS, variables: defaultVariables })

				data.feed.links.unshift(post)
				store.writeQuery({
					query: GET_FEEDS,
					variables: defaultVariables,
					data,
				})
			} catch (error) {
				console.error('Error to update cache: ', error)
			}
		},
	})

	return { addFeed, url, setUrl, description, setDescription, handleReset }
}

export default useAddFeed
