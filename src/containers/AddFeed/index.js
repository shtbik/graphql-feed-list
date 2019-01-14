import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { withSnackbar } from 'notistack'

import ADD_FEED from 'qql/mutations/feed'
import GET_FEEDS from 'qql/queries/feed'
import styles from './styles'

const initialState = {
	description: '',
	url: '',
}

class AddFeed extends Component {
	state = initialState

	onChange = e => {
		const { value, name } = e.target
		this.setState({ [name]: value })
	}

	onSubmit = e => {
		e.preventDefault()
		const { addFeed, enqueueSnackbar } = this.props

		addFeed({
			variables: this.state,
		}).then(res => {
			// Лучше выбрать что-то одно

			const { errors } = res
			if (errors) errors.map(error => enqueueSnackbar(error.message, { variant: 'error' }))
			else {
				enqueueSnackbar('Well Done! Feed has been successfully added.', { variant: 'success' })
				this.clearForm()
			}
		})
	}

	clearForm = () => {
		this.setState(initialState)
	}

	render() {
		const { description, url } = this.state
		const { classes } = this.props

		return (
			<div className={classes.main}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h5">
						Add Feed Item
					</Typography>
					<form className={classes.container} onSubmit={this.onSubmit} autoComplete="off">
						<TextField
							required
							label="Url"
							className={classes.textField}
							value={url}
							onChange={this.onChange}
							margin="normal"
							name="url"
							placeholder="The URL for the feed"
						/>

						<TextField
							required
							multiline
							rows="4"
							label="Description"
							className={classes.textField}
							value={description}
							onChange={this.onChange}
							margin="normal"
							name="description"
							placeholder="A description for the feed"
						/>

						<Button type="submit" variant="contained" color="primary" className={classes.button}>
							Create Feed
						</Button>
					</form>
				</Paper>
			</div>
		)
	}
}

AddFeed.propTypes = {
	classes: PropTypes.object.isRequired,
	addFeed: PropTypes.func.isRequired,
	enqueueSnackbar: PropTypes.func.isRequired,
}

export default compose(
	withStyles(styles),
	withRouter,
	withSnackbar,
	graphql(ADD_FEED, {
		name: 'addFeed',
		options: {
			update: (proxy, { data: { post } }) => {
				// How to solve it?
				try {
					const { feed } = proxy.readQuery({ query: GET_FEEDS })
					proxy.writeQuery({
						query: GET_FEEDS,
						data: {
							feed: {
								...feed,
								links: feed.links.concat([post]),
							},
						},
					})
				} catch (e) {
					console.log('Error to update chache', e)
				}
			},
		},
	})
)(AddFeed)
