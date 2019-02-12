import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

import debounce from 'utils/debounce'

import styles from './styles'

class Search extends PureComponent {
	state = {
		text: '',
	}

	onSearch = debounce(value => {
		const { onSearch, getInitialList } = this.props

		if (!value) getInitialList()
		else onSearch(value)
	}, 300)

	onInputChange = e => {
		const { value } = e.target
		e.preventDefault()
		this.setState({ text: value })

		this.onSearch(value)
	}

	render() {
		const { className, classes } = this.props
		const { text } = this.state

		return (
			<div className={className}>
				<form onSubmit={this.onSearch}>
					<TextField
						id="filled-search"
						label="Search feed"
						type="search"
						margin="normal"
						value={text}
						onChange={this.onInputChange}
						className={classes.textField}
					/>
				</form>
			</div>
		)
	}
}

Search.propTypes = {
	className: PropTypes.string,
	onSearch: PropTypes.func.isRequired,
	getInitialList: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
}
Search.defaultProps = {
	className: '',
}

export default withStyles(styles)(Search)
