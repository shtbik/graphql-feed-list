import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import GestureIcon from '@material-ui/icons/Gesture'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'

import { AUTH_TOKEN } from 'configs/app'

import styles from './styles'

class Header extends Component {
	logout = () => {
		const { history } = this.props
		localStorage.removeItem(AUTH_TOKEN)
		history.push(`/`)
	}

	render() {
		const { classes } = this.props
		const authToken = localStorage.getItem(AUTH_TOKEN)

		return (
			<Fragment>
				<CssBaseline />
				<AppBar position="static" className={classes.appBar}>
					<Toolbar>
						<GestureIcon className={classes.icon} />
						<Typography variant="h6" noWrap className={classes.logo}>
							<Link color="inherit" to="/">
								GraphQL Client App
							</Link>
						</Typography>
						<div>
							{authToken ? (
								<Button onClick={this.logout} color="inherit">
									Logout
								</Button>
							) : (
								<Fragment>
									<Button component={Link} to="/sign-in" color="inherit">
										Sign In
									</Button>
									<Button component={Link} to="/sign-up" color="inherit">
										Sign Up
									</Button>
								</Fragment>
							)}
						</div>
					</Toolbar>
				</AppBar>
			</Fragment>
		)
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Header))
