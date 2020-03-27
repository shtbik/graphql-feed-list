import { useState, useEffect } from 'react'

const useInfiniteScroll = callback => {
	const [isFetching, setIsFetching] = useState(false)

	useEffect(() => {
		function isScrolling() {
			if (
				window.innerHeight + document.documentElement.scrollTop !==
					document.documentElement.offsetHeight ||
				isFetching
			)
				return
			setIsFetching(true)
		}

		window.addEventListener('scroll', isScrolling)
		return () => window.removeEventListener('scroll', isScrolling)
	}, [])

	useEffect(() => {
		if (!isFetching) return
		callback(isFetching, setIsFetching)
	}, [isFetching])

	return [isFetching, setIsFetching]
}

export default useInfiniteScroll
