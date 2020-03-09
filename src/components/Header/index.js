import React from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import GestureIcon from '@material-ui/icons/Gesture'
import ExitToApp from '@material-ui/icons/ExitToApp'
import AccountBox from '@material-ui/icons/AccountBox'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'

import { AUTH_TOKEN, AUTH_USER } from 'configs/consts'

import styles from './styles'

const Header = ({ history: { push }, classes }) => {
	const onLogout = () => {
		localStorage.removeItem(AUTH_TOKEN)
		push(`/`)
	}

	// TODO: move to useLocalStorage hook for sync browser's tabs
	const authToken = localStorage.getItem(AUTH_TOKEN)
	const userData = JSON.parse(localStorage.getItem(AUTH_USER)) || {}
	const { name } = userData

	return (
		<>
			<CssBaseline />
			<AppBar position="static" className={classes.appBar}>
				<Toolbar>
					<GestureIcon className={classes.logoIcon} />
					<Typography variant="h6" noWrap className={classes.logo}>
						<Link color="inherit" to="/">
							GraphQL Client App
						</Link>
					</Typography>
					<div>
						{authToken ? (
							<>
								<Button component={Link} to="/me" color="inherit">
									{name} <AccountBox className={classes.icon} />
								</Button>
								<Button onClick={onLogout} color="inherit">
									Logout <ExitToApp className={classes.icon} />
								</Button>
							</>
						) : (
							<>
								<Button component={Link} to="/sign-in" color="inherit">
									Sign In
								</Button>
								<Button component={Link} to="/sign-up" color="inherit">
									Sign Up
								</Button>
							</>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</>
	)
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Header))
