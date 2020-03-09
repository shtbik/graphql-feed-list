import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const Footer = ({ classes }) => (
	<footer className={classes.footer}>
		<Typography variant="h6" align="center" gutterBottom>
			© Aleksandr Shtykov
		</Typography>
	</footer>
)

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Footer)
