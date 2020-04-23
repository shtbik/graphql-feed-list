import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'

import { GOOGLE_CLIENT_ID } from 'configs/oauth'
import { AUTH_TOKEN, AUTH_USER } from 'configs/consts'

import useOAuth from './hooks/useOAuth'

const OAuth = ({ providers, className, history: { push } }) => {
	const { oAuthLogin } = useOAuth()

	const saveUserData = ({ token, user }) => {
		localStorage.setItem(AUTH_TOKEN, token)
		localStorage.setItem(AUTH_USER, JSON.stringify(user))
	}

	// TODO: need refactoring
	const responseGoogle = response => {
		// TODO: add error handler
		oAuthLogin({ variables: { provider: 'google', token: response.tokenId } }).then(
			({ data: { oAuthLogin: user } }) => {
				saveUserData(user)
				push(`/`)
			}
		)
	}

	const config = {
		google: (
			<GoogleLogin
				clientId={GOOGLE_CLIENT_ID}
				buttonText="Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
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
}

OAuth.defaultProps = {
	providers: [],
	className: '',
}

export default withRouter(OAuth)
