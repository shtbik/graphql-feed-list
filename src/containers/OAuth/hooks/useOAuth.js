import { useMutation } from '@apollo/react-hooks'

import { OAUTH_MUTATION } from 'gql/mutations/auth'

const useOAuth = () => {
	const [oAuthLogin] = useMutation(OAUTH_MUTATION)

	return { oAuthLogin }
}

export default useOAuth
