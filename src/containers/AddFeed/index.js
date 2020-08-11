import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { flowRight as compose } from 'lodash'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { withSnackbar } from 'notistack'

import useAddFeed from './hooks/useAddFeed'

import styles from './styles'

const AddFeed = ({ classes, enqueueSnackbar }) => {
	const { addFeed, url, setUrl, description, setDescription, handleReset } = useAddFeed()

	const onSubmit = event => {
		event.preventDefault()

		// Has warning about postedBy, and votes
		addFeed({
			variables: {
				url,
				description,
			},
		}).then(res => {
			const { errors } = res
			if (errors) errors.map(error => enqueueSnackbar(error.message, { variant: 'error' }))
			else {
				enqueueSnackbar('Well Done! Feed has been successfully added.', { variant: 'success' })
				handleReset()
			}
		})
	}

	const onChange = fieldName => event => {
		const setConfig = {
			url: setUrl,
			description: setDescription,
		}

		setConfig[fieldName](event.target.value)
	}

	return (
		<div className={classes.main}>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h5">
					Add Feed Item
				</Typography>
				<form className={classes.container} onSubmit={onSubmit} autoComplete="off">
					<TextField
						required
						label="Url"
						className={classes.textField}
						value={url}
						onChange={onChange('url')}
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
						onChange={onChange('description')}
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

AddFeed.propTypes = {
	classes: PropTypes.object.isRequired,
	enqueueSnackbar: PropTypes.func.isRequired,
}

export default compose(withStyles(styles), withRouter, withSnackbar)(AddFeed)
