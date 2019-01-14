import React from 'react'
import PropTypes from 'prop-types'

import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const Loader = ({ classes }) => (
	<div className={classes.loaderBlock}>
		<CircularProgress className={classes.progress} />
	</div>
)

Loader.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Loader)
