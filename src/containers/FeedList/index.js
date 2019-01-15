import React, { PureComponent, Fragment } from 'react'
import { compose, graphql } from 'react-apollo'
// import { Link } from 'react-router-dom'
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
import ThumbDown from '@material-ui/icons/ThumbDown'
import { withStyles } from '@material-ui/core/styles'
import { withSnackbar } from 'notistack'

import GET_FEEDS from 'qql/queries/feed'
import { VOTE_MUTATION } from 'qql/mutations/feed'
import Content from 'components/Content'
import HeroUnit from 'components/HeroUnit'
import Loader from 'components/Loader'
import { timeDifferenceForDate } from 'utils/time'

import styles from './styles'

class Feed extends PureComponent {
	handleVote(linkId) {
		const { voteForFeed, enqueueSnackbar } = this.props
		voteForFeed({
			variables: { linkId },
		}).then(res => {
			const { errors } = res
			if (errors) errors.map(error => enqueueSnackbar(error.message, { variant: 'error' }))
			else enqueueSnackbar('Well Done! Vote has been successfully accepted.', { variant: 'success' })
		})
	}

	render() {
		const { loading, error, feed, classes } = this.props
		// const authToken = localStorage.getItem(AUTH_TOKEN)

		if (loading) return <Loader />
		if (error) return <div className={classes.error}>Error</div>

		const listArray = feed.links

		return (
			<Fragment>
				<HeroUnit />
				<Content>
					<Grid container spacing={40}>
						{listArray.map((item, key) => (
							<Grid item key={item.id} sm={12} md={6} lg={4}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										image={`https://picsum.photos/680/500/?image=${key}&random&gravity=center`}
										title="Image title"
									/>
									<CardContent className={classes.cardContent}>
										<Typography gutterBottom variant="h5" component="h2">
											{item.description}
										</Typography>
										<Typography gutterBottom variant="subtitle1">
											{item.postedBy ? item.postedBy.name : 'Unknown'} {timeDifferenceForDate(item.createdAt)}
										</Typography>
										<Typography gutterBottom variant="subtitle1">
											{(item.votes && item.votes.length) || 0} votes
										</Typography>
									</CardContent>
									<CardActions>
										<IconButton
											onClick={() => this.handleVote(item.id)}
											className={classes.button}
											aria-label="ThumbUp"
											color="primary"
										>
											<ThumbUp />
										</IconButton>
										<IconButton className={classes.button} aria-label="ThumbDown" color="secondary">
											<ThumbDown />
										</IconButton>

										<Button size="small" href={item.url} color="primary">
											{/* <Button size="small" component={Link} to={item.url} color="primary"> */}
											Link
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Content>
			</Fragment>
		)
	}
}

Feed.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.object,
	feed: PropTypes.object,
	classes: PropTypes.object.isRequired,
	voteForFeed: PropTypes.func.isRequired,
	enqueueSnackbar: PropTypes.func.isRequired,
}

Feed.defaultProps = {
	feed: {},
}

Feed.defaultProps = {
	error: null,
}

export default compose(
	withStyles(styles),
	withSnackbar,
	graphql(GET_FEEDS, {
		props: props => {
			const {
				data: { loading, error, feed },
			} = props

			return {
				loading,
				error,
				feed,
			}
		},
	}),
	graphql(VOTE_MUTATION, {
		name: 'voteForFeed',
		options: {
			update: (store, { data }) => {
				const linkId = data.vote.link.id

				const feedsData = store.readQuery({ query: GET_FEEDS })
				const votedLink = feedsData.feed.links.find(link => link.id === linkId)
				votedLink.votes = data.vote.link.votes

				store.writeQuery({ query: GET_FEEDS, data: feedsData })
			},
		},
	})
)(Feed)
