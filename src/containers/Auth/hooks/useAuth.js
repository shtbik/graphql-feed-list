import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { LOGIN_MUTATION, SIGNUP_MUTATION } from 'gql/mutations/auth'

const useAddFeed = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})

	const variables = formData

	const [login] = useMutation(LOGIN_MUTATION, { variables })
	const [signUp] = useMutation(SIGNUP_MUTATION, { variables })

	return { login, signUp, formData, setFormData }
}

export default useAddFeed
