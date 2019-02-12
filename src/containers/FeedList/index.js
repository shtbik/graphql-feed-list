import React, { PureComponent, Fragment } from 'react'
import { compose, graphql, withApollo } from 'react-apollo'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { withSnackbar } from 'notistack'

import {
	GET_FEEDS,
	FEED_SEARCH_QUERY,
	NEW_FEEDS_SUBSCRIPTION,
	NEW_VOTES_SUBSCRIPTION,
} from 'qql/queries/feed'
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

	subscribeToNewLinks = subscribeToMore => {
		subscribeToMore({
			document: NEW_FEEDS_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev
				const { data } = subscriptionData
				const { newLink } = data
				const exists = prev.feed.links.find(({ id }) => id === newLink.id)
				if (exists) return prev

				return Object.assign({}, prev, {
					feed: {
						links: [newLink, ...prev.feed.links],
						count: prev.feed.links.length + 1,
						/* eslint no-underscore-dangle: "off" */
						__typename: prev.feed.__typename,
					},
				})
			},
		})
	}

	subscribeToNewVotes = subscribeToMore => {
		subscribeToMore({
			document: NEW_VOTES_SUBSCRIPTION,
		})
	}

	render() {
		const { loading, error, feed, classes, subscribeToMore } = this.props
		const { feeds } = this.state
		// const authToken = localStorage.getItem(AUTH_TOKEN)

		// TODO: add implementation of search loading
		if (loading) return <Loader />
		if (error) return <div className={classes.error}>Error</div>

		this.subscribeToNewLinks(subscribeToMore)
		this.subscribeToNewVotes(subscribeToMore)

		const listArray = feeds || feed.links

		return (
			<Fragment>
				<HeroUnit />

				<Content>
					<Grid container spacing={40}>
						<Grid item sm={12} md={6} lg={4}>
							<Search
								className={classes.searchBlock}
								onSearch={this.onSearch}
								getInitialList={this.getInitialList}
							/>
						</Grid>
					</Grid>
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
	subscribeToMore: PropTypes.func.isRequired,
}

FeedList.defaultProps = {
	feed: {},
	error: null,
}

export default compose(
	withApollo,
	withStyles(styles),
	withSnackbar,
	graphql(GET_FEEDS, {
		props: props => {
			const {
				data: { loading, error, feed = {}, subscribeToMore },
			} = props
			const { links = [] } = feed
			links.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

			return {
				loading,
				error,
				feed,
				subscribeToMore,
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
