import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const Loader = ({ classes, wrapperClass }) => (
	<div className={cn(classes.loaderBlock, wrapperClass)}>
		<CircularProgress className={classes.progress} />
	</div>
)

Loader.propTypes = {
	classes: PropTypes.object.isRequired,
	wrapperClass: PropTypes.string,
}

Loader.defaultProps = {
	wrapperClass: '',
}

export default withStyles(styles)(Loader)
