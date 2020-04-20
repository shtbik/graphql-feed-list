import { useState, useEffect, useLayoutEffect } from 'react'

const useInfiniteScroll = callback => {
	const [isFetching, setFetching] = useState(false)

	function handleScroll() {
		if (
			window.innerHeight + document.documentElement.scrollTop !==
				document.documentElement.offsetHeight ||
			isFetching
		) {
			return
		}

		setFetching(true)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useLayoutEffect(() => {
		if (!isFetching) return
		callback(isFetching, setFetching)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFetching])

	return [isFetching, setFetching]
}

export default useInfiniteScroll
