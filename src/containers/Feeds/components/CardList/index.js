import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Loader from 'components/Loader'

import Card from '../Card'
import styles from '../../styles'

const FeedList = ({ loading, error, data, handleVote, classes }) => {
	if (loading) return <Loader wrapperClass={classes.loader} />
	if (error)
		return (
			<div className={classes.error}>
				<Typography variant="h6" align="center" paragraph>
					Something happened on our end. Try again later
				</Typography>
			</div>
		)

	return !data.length ? (
		<div className={classes.error}>
			<Typography variant="h6" align="center" paragraph>
				Nothing found
			</Typography>
		</div>
	) : (
		<Grid container spacing={5}>
			{data.map(item => (
				<Card key={item.id} feed={item} handleVote={handleVote} />
			))}
		</Grid>
	)
}

FeedList.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.object,
	data: PropTypes.array,
	classes: PropTypes.object.isRequired,
	handleVote: PropTypes.func.isRequired,
}

FeedList.defaultProps = {
	data: [],
	error: null,
}

export default withStyles(styles)(FeedList)
