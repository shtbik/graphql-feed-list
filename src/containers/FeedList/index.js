import React, { PureComponent, Fragment } from 'react'
import { compose, graphql, withApollo } from 'react-apollo'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { withSnackbar } from 'notistack'

import { GET_FEEDS, FEED_SEARCH_QUERY } from 'qql/queries/feed'
import { VOTE_MUTATION } from 'qql/mutations/feed'
import Content from 'components/Content'
import HeroUnit from 'components/HeroUnit'
import Feed from 'components/Feed'
import Loader from 'components/Loader'
import Search from 'components/Search'

import styles from './styles'

class FeedList extends PureComponent {
	state = {
		feeds: null,
	}

	handleVote = linkId => {
		const { voteForFeed, enqueueSnackbar } = this.props
		voteForFeed({
			variables: { linkId },
		}).then(res => {
			const { errors } = res
			if (errors) errors.map(error => enqueueSnackbar(error.message, { variant: 'error' }))
			else enqueueSnackbar('Well Done! Vote has been successfully accepted.', { variant: 'success' })
		})
	}

	onSearch = async text => {
		const { client, enqueueSnackbar } = this.props

		const result = await client.query({
			query: FEED_SEARCH_QUERY,
			variables: { filter: text },
		})

		const { errors, data } = result
		if (errors) errors.map(error => enqueueSnackbar(error.message, { variant: 'error' }))
		else {
			const { links } = data.feed
			this.setState({ feeds: links })
		}
	}

	getInitialList = () => {
		this.setState({ feeds: null })
	}

	render() {
		const { loading, error, feed, classes } = this.props
		const { feeds } = this.state
		// const authToken = localStorage.getItem(AUTH_TOKEN)

		// TODO: add implementation of search loading
		if (loading) return <Loader />
		if (error) return <div className={classes.error}>Error</div>

		const listArray = feeds || feed.links

		return (
			<Fragment>
				<HeroUnit />

				<Content>
					<Search
						className={classes.searchBlock}
						onSearch={this.onSearch}
						getInitialList={this.getInitialList}
					/>
					{feeds && !feeds.length ? (
						<div className={classes.error}>Nothing found</div>
					) : (
						<Grid container spacing={40}>
							{listArray.map(item => (
								<Feed key={item.id} feed={{ ...item }} handleVote={this.handleVote} />
							))}
						</Grid>
					)}
				</Content>
			</Fragment>
		)
	}
}

FeedList.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.object,
	feed: PropTypes.object,
	classes: PropTypes.object.isRequired,
	voteForFeed: PropTypes.func.isRequired,
	enqueueSnackbar: PropTypes.func.isRequired,
	client: PropTypes.object.isRequired,
}

FeedList.defaultProps = {
	feed: {},
}

FeedList.defaultProps = {
	error: null,
}

export default compose(
	withApollo,
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
)(FeedList)
