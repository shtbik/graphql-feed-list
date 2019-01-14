import gql from 'graphql-tag'

const SIGNUP_MUTATION = gql`
	mutation signUp($email: String!, $password: String!, $name: String!) {
		signup(email: $email, password: $password, name: $name) {
			token
		}
	}
`

const LOGIN_MUTATION = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`

export { SIGNUP_MUTATION, LOGIN_MUTATION }
