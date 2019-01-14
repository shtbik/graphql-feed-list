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

import GET_FEEDS from 'qql/queries/feed'
import Content from 'components/Content'
import HeroUnit from 'components/HeroUnit'
import Loader from 'components/Loader'

import styles from './styles'

class Feed extends PureComponent {
	render() {
		const { loading, error, feed, classes } = this.props

		if (loading) return <Loader />
		if (error) return <div>Error</div>

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
									</CardContent>
									<CardActions>
										<IconButton className={classes.button} aria-label="ThumbUp" color="primary">
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
}

Feed.defaultProps = {
	feed: {},
}

Feed.defaultProps = {
	error: null,
}

export default compose(
	withStyles(styles),
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
	})
)(Feed)
