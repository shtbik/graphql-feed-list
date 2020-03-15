import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { ADD_FEED } from 'gql/mutations/feed'
import { GET_FEEDS } from 'gql/queries/feed'

const useAddFeed = () => {
	const [url, setUrl] = useState('')
	const [description, setDescription] = useState('')

	const handleReset = () => {
		setUrl('')
		setDescription('')
	}

	const [addFeed] = useMutation(ADD_FEED, {
		update: (store, { data: { post } }) => {
			try {
				// TODO: doesn't work, need to fix store.readQuery
				// maybe need push variables to query
				const data = store.readQuery({ query: GET_FEEDS })

				data.feed.links.unshift(post)
				store.writeQuery({
					query: GET_FEEDS,
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
