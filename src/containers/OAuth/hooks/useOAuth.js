import { useMutation } from '@apollo/react-hooks'

import { OAUTH_MUTATION } from 'gql/mutations/auth'

const useOAuth = () => {
	const [oAuth] = useMutation(OAUTH_MUTATION)

	return { oAuth }
}

export default useOAuth
