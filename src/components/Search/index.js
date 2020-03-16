import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const Search = ({ handleSearch, wrapperClass, classes }) => {
	const [search, setSearch] = useState('')

	const onSearch = event => {
		event.preventDefault()
		const {
			target: {
				elements: {
					search: { value },
				},
			},
		} = event

		setSearch(value)
		handleSearch(value)
	}

	const delayedSearch = useCallback(debounce(value => handleSearch(value), 1000), [])

	const onChange = event => {
		event.preventDefault()
		const { value } = event.target

		setSearch(value)
		delayedSearch(value)
	}

	return (
		<div className={wrapperClass}>
			<form onSubmit={onSearch}>
				<TextField
					name="search"
					id="filled-search"
					label="React, GQL, etc."
					type="search"
					margin="normal"
					value={search}
					onChange={onChange}
					className={classes.textField}
				/>
			</form>
		</div>
	)
}

Search.propTypes = {
	handleSearch: PropTypes.func.isRequired,
	wrapperClass: PropTypes.string,
	classes: PropTypes.object.isRequired,
}
Search.defaultProps = {
	wrapperClass: '',
}

export default withStyles(styles)(Search)
