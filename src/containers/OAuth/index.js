import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { useLocalStorage } from '@rehooks/local-storage'

import { AUTH_TOKEN, AUTH_USER } from 'configs/consts'
import { withSnackbar } from 'notistack'

import useOAuth from './hooks/useOAuth'

const OAuth = ({ providers, className, history: { push }, enqueueSnackbar }) => {
	const { oAuth } = useOAuth()
	const [, setToken] = useLocalStorage(AUTH_TOKEN)
	const [, setUser] = useLocalStorage(AUTH_USER)

	const saveUserData = ({ token, user }) => {
		setToken(token)
		// TODO: remove data after logout
		setUser(user)
	}

	const googleRes = ({ error, tokenId }) => {
		if (error) return

		oAuth({ variables: { provider: 'google', token: tokenId } })
			.then(({ data: { oAuth: user } }) => {
				saveUserData(user)
				return push(`/`)
			})
			.catch(errors => {
				console.error('catch', errors)
				enqueueSnackbar('Something went wrong. Please try again later.', { variant: 'error' })
			})
	}

	const config = {
		google: (
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
				buttonText="Google"
				onSuccess={googleRes}
				onFailure={googleRes}
				cookiePolicy="single_host_origin"
				// isSignedIn
			/>
		),
	}

	return (
		<div className={className}>
			{providers.map(provider => (
				<div key={provider}>{config[provider]}</div>
			))}
		</div>
	)
}

OAuth.propTypes = {
	providers: PropTypes.arrayOf(PropTypes.string),
	className: PropTypes.string,
	history: PropTypes.object.isRequired,
	enqueueSnackbar: PropTypes.func.isRequired,
}

OAuth.defaultProps = {
	providers: [],
	className: '',
}

export default withSnackbar(withRouter(OAuth))
