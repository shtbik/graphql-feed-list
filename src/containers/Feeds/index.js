import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { withStyles } from '@material-ui/core/styles'
import { withSnackbar } from 'notistack'

import Content from 'components/Content'
import HeroUnit from 'components/HeroUnit'
import Loader from 'components/Loader'
import Search from 'components/Search'
import useInfiniteScroll from 'utils/hooks/useInfiniteScroll'

import CardList from './components/CardList'
import useFeedList from './hooks/useFeedList'

import styles from './styles'

const FeedList = ({ enqueueSnackbar, classes }) => {
	const { loading, error, data, total, fetchMore, setSearch, setSkip, voteForFeed } = useFeedList()

	const [isFetchMoreLoading] = useInfiniteScroll(fetchMore)

	const handleVote = linkId => {
		voteForFeed({
			variables: { linkId },
		}).then(res => {
			const { errors } = res
			if (errors) errors.map(_error => enqueueSnackbar(_error.message, { variant: 'error' }))
			else enqueueSnackbar('Well Done! Vote has been successfully accepted.', { variant: 'success' })
		})
	}

	const handleSearch = searchQuery => {
		// have issue when user loaded all items, then found something special,
		// then remove his query. His 'skip' value - 0, but he will see all items
		setSkip(0)
		setSearch(searchQuery)
	}

	return (
		<>
			<HeroUnit />

			<Content>
				<Grid container spacing={3}>
					<Grid item sm={12} md={6} lg={4}>
						<Search wrapperClass={classes.searchBlock} handleSearch={handleSearch} />
					</Grid>
					<Grid item sm={12} className={classes.cardList}>
						<CardList loading={loading} error={error} data={data} handleVote={handleVote} />

						{isFetchMoreLoading && data.length && data.length !== total ? (
							<Loader wrapperClass={classes.fetchMoreLoader} />
						) : null}
					</Grid>
				</Grid>
			</Content>
		</>
	)
}

FeedList.propTypes = {
	classes: PropTypes.object.isRequired,
	enqueueSnackbar: PropTypes.func.isRequired,
}

export default withSnackbar(withStyles(styles)(FeedList))
