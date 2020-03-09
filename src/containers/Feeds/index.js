import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { withSnackbar } from 'notistack'

import Content from 'components/Content'
import HeroUnit from 'components/HeroUnit'

import Search from 'components/Search'
import CardList from './components/CardList'
import useFeedList from './hooks/useFeedList'

import styles from './styles'

const FeedList = ({ enqueueSnackbar, classes }) => {
	const { loading, error, data, setSearch, voteForFeed } = useFeedList()

	const handleVote = linkId => {
		voteForFeed({
			variables: { linkId },
		}).then(res => {
			const { errors } = res
			if (errors) errors.map(_error => enqueueSnackbar(_error.message, { variant: 'error' }))
			else enqueueSnackbar('Well Done! Vote has been successfully accepted.', { variant: 'success' })
		})
	}

	return (
		<>
			<HeroUnit />

			<Content>
				<Grid container spacing={5}>
					<Grid item sm={12} md={6} lg={4}>
						<Search wrapperClass={classes.searchBlock} handleSearch={setSearch} />
					</Grid>
					<Grid item sm={12}>
						<CardList loading={loading} error={error} data={data} handleVote={handleVote} />
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
