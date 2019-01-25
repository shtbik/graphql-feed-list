import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'

import debounce from 'utils/debounce'

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
		const { text } = this.state
		const { className } = this.props

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
}
Search.defaultProps = {
	className: '',
}

export default Search
