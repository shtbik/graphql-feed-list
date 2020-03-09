import React from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

// TODO: change keys to codes
const linkConfig = {
	'/': {
		to: '/add-feed',
		text: 'Creating Feed',
	},
	'/add-feed': {
		to: '/',
		text: 'Feed List',
	},
}

const HeroUnit = ({ classes, location: { pathname } }) => {
	const buttonConfig = linkConfig[pathname] || {
		to: '/',
		text: 'Feed List',
	}

	return (
		<div className={classes.heroUnit}>
			<div className={classes.heroContent}>
				<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
					Feed List
				</Typography>
				<Typography variant="h6" align="center" color="textSecondary" paragraph>
					You need authorize for creating or voting for item
				</Typography>
				<div className={classes.heroButtons}>
					<Grid container spacing={2} justify="center">
						<Grid item>
							<Button component={Link} to={buttonConfig.to} variant="contained" color="primary">
								{buttonConfig.text}
							</Button>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	)
}

HeroUnit.propTypes = {
	classes: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(HeroUnit))
