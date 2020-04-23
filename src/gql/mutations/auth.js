import gql from 'graphql-tag'

const SIGNUP_MUTATION = gql`
	mutation signUp($email: String!, $password: String!, $name: String!) {
		signup(email: $email, password: $password, name: $name) {
			token
			user {
				id
				name
				email
			}
		}
	}
`

const OAUTH_MUTATION = gql`
	mutation oAuthLogin($provider: String!, $token: String!) {
		oAuthLogin(provider: $provider, token: $token) {
			token
			user {
				id
				name
				email
			}
		}
	}
`

const LOGIN_MUTATION = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
				name
				email
			}
		}
	}
`

export { SIGNUP_MUTATION, OAUTH_MUTATION, LOGIN_MUTATION }
