import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { flowRight as compose } from 'lodash'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { withSnackbar } from 'notistack'

import OAuth from 'containers/OAuth'
import { AUTH_TOKEN, AUTH_USER } from 'configs/consts'

import useAuth from './hooks/useAuth'

import styles from './styles'

const Auth = ({ location: { pathname }, history: { push }, enqueueSnackbar, classes }) => {
	const formName = pathname.slice(1)
	const isSignUpPage = formName === 'sign-up'

	const saveUserData = ({ token, user }) => {
		localStorage.setItem(AUTH_TOKEN, token)
		localStorage.setItem(AUTH_USER, JSON.stringify(user))
	}

	const confirmAuth = data => {
		const userData = isSignUpPage ? data.signup : data.login
		saveUserData(userData)
		push(`/`)
	}

	const { login, signUp, formData, setFormData } = useAuth()
	const { email, password, name } = formData

	const formsConfig = {
		'sign-in': {
			title: 'Sign In',
			submitBtnText: 'Sign In',
			handleSubmit: login,
		},
		'sign-up': {
			title: 'Sign Up',
			submitBtnText: 'Sign Up',
			handleSubmit: signUp,
		},
	}

	const formConfig = formsConfig[formName]
	const { title, submitBtnText, handleSubmit } = formConfig

	const onSubmit = e => {
		e.preventDefault()

		handleSubmit()
			.then(({ data, errors }) => {
				if (errors) errors.map(error => enqueueSnackbar(error.message, { variant: 'error' }))
				else confirmAuth(data)
			})
			// https://stackoverflow.com/questions/59465864/handling-errors-with-react-apollo-usemutation-hook
			.catch(() => {
				enqueueSnackbar('Something went wrong. Please try again later.', { variant: 'error' })
			})
	}

	const onChange = event => {
		const { name: key, value } = event.target

		setFormData({
			...formData,
			[key]: value,
		})
	}

	return (
		<main className={classes.main}>
			<CssBaseline />
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{title}
				</Typography>
				<form className={classes.form} onSubmit={onSubmit}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input
							id="email"
							name="email"
							value={email}
							onChange={onChange}
							autoComplete="email"
							autoFocus
						/>
					</FormControl>

					{isSignUpPage && (
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="name">Name</InputLabel>
							<Input id="name" name="name" value={name} onChange={onChange} />
						</FormControl>
					)}

					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							name="password"
							value={password}
							onChange={onChange}
							type="password"
							id="password"
							autoComplete="current-password"
						/>
					</FormControl>

					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						{submitBtnText}
					</Button>

					<OAuth className={classes.oauth} providers={['google']} />
				</form>
			</Paper>
		</main>
	)
}

Auth.propTypes = {
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	enqueueSnackbar: PropTypes.func.isRequired,
}

export default compose(withStyles(styles), withSnackbar, withRouter)(Auth)
