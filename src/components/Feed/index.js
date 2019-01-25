import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import ThumbUp from '@material-ui/icons/ThumbUp'
import { withStyles } from '@material-ui/core/styles'

import { timeDifferenceForDate } from 'utils/time'

import styles from './styles'

const Feed = ({
	feed: { id, description, postedBy, createdAt, votes, url },
	classes,
	handleVote,
}) => (
	<Grid item key={id} sm={12} md={6} lg={4}>
		<Card className={classes.card}>
			<CardMedia
				className={classes.cardMedia}
				image={`https://picsum.photos/680/500/?random&gravity=center&image=${id}`}
				title="Image title"
			/>
			<CardContent className={classes.cardContent}>
				<Typography gutterBottom variant="h5" component="h2">
					{description}
				</Typography>
				<Typography gutterBottom variant="subtitle1">
					{postedBy ? postedBy.name : 'Unknown'} {timeDifferenceForDate(createdAt)}
				</Typography>
				<Typography gutterBottom variant="subtitle1">
					{(votes && votes.length) || 0} votes
				</Typography>
			</CardContent>
			<CardActions>
				<IconButton
					onClick={() => handleVote(id)}
					className={classes.button}
					aria-label="ThumbUp"
					color="primary"
				>
					<ThumbUp />
				</IconButton>

				{/* TODO: add unvote functionality */}
				{/* <IconButton className={classes.button} aria-label="ThumbDown" color="secondary">
          <ThumbDown />
        </IconButton> */}

				<Button size="small" href={url} color="primary">
					Link
				</Button>
			</CardActions>
		</Card>
	</Grid>
)

Feed.propTypes = {
	feed: PropTypes.shape({
		id: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		postedBy: PropTypes.object,
		createdAt: PropTypes.string.isRequired,
		votes: PropTypes.array,
		url: PropTypes.string.isRequired,
	}).isRequired,
	classes: PropTypes.object.isRequired,
	handleVote: PropTypes.func.isRequired,
}

export default withStyles(styles)(Feed)
