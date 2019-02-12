import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import { withSnackbar } from 'notistack'

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import { AUTH_TOKEN, AUTH_USER } from 'configs/app'
import { LOGIN_MUTATION, SIGNUP_MUTATION } from 'qql/mutations/auth'

import styles from './styles'

class Auth extends Component {
	constructor(props) {
		super(props)

		const {
			login,
			signUp,
			location: { pathname },
		} = props
		const formName = pathname.slice(1)

		this.state = {
			name: '',
			email: '',
			password: '',
		}

		const formsConfig = {
			'sign-in': {
				title: 'Sign In',
				submitBtnText: 'Sign In',
				onSubmit: login,
			},
			'sign-up': {
				title: 'Sign Up',
				submitBtnText: 'Sign Up',
				onSubmit: signUp,
			},
		}

		this.formConfig = formsConfig[formName]
		this.isSignUpPage = formsConfig[formName].title === 'Sign Up'
	}

	onSubmit = e => {
		e.preventDefault()
		const { enqueueSnackbar } = this.props

		this.formConfig
			.onSubmit({
				variables: this.state,
			})
			.then(res => {
				const { errors, data } = res
				if (errors) errors.map(error => enqueueSnackbar(error.message, { variant: 'error' }))
				else this.confirmAuth(data)
			})
			.catch(() => {
				enqueueSnackbar('Something went wrong. Please try again later.', { variant: 'error' })
			})
	}

	onChange = e => {
		const { value, name } = e.target
		this.setState({ [name]: value })
	}

	confirmAuth = data => {
		const { history } = this.props
		const userData = this.isSignUpPage ? data.signup : data.login
		this.saveUserData(userData)
		history.push(`/`)
	}

	saveUserData = userData => {
		const { token, user } = userData
		localStorage.setItem(AUTH_TOKEN, token)
		localStorage.setItem(AUTH_USER, JSON.stringify(user))
	}

	render() {
		const { classes } = this.props
		const { email, password, name } = this.state

		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{this.formConfig.title}
					</Typography>
					<form className={classes.form} onSubmit={this.onSubmit}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Email Address</InputLabel>
							<Input
								id="email"
								name="email"
								value={email}
								onChange={this.onChange}
								autoComplete="email"
								autoFocus
							/>
						</FormControl>

						{this.isSignUpPage && (
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="name">Name</InputLabel>
								<Input id="name" name="name" value={name} onChange={this.onChange} />
							</FormControl>
						)}

						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input
								name="password"
								value={password}
								onChange={this.onChange}
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						</FormControl>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							{this.formConfig.submitBtnText}
						</Button>
					</form>
				</Paper>
			</main>
		)
	}
}

Auth.propTypes = {
	classes: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired,
	signUp: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	enqueueSnackbar: PropTypes.func.isRequired,
}

export default compose(
	withStyles(styles),
	withRouter,
	withSnackbar,
	graphql(LOGIN_MUTATION, {
		name: 'login',
	}),
	graphql(SIGNUP_MUTATION, {
		name: 'signUp',
	})
)(Auth)
