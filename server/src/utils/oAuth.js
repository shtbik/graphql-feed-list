const { OAuth2Client } = require('google-auth-library')

const { GOOGLE_CLIENT_ID, GOOGLE_BACK_ID } = require('../configs/oauth')

async function googleVerify(idToken) {
	const client = new OAuth2Client(GOOGLE_BACK_ID)
	const ticket = await client.verifyIdToken({
		idToken,
		audience: GOOGLE_CLIENT_ID,
	})
	return ticket.getPayload()
}

module.exports = {
	googleVerify,
}
