import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const Error404 = ({ classes }) => (
	<div className={classes.center}>
		<Typography variant="h6" align="center" paragraph>
			Page not found 404
		</Typography>
	</div>
)

Error404.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Error404)
