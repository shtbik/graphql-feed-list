const { OAuth2Client } = require('google-auth-library')

async function googleVerify(idToken) {
	const client = new OAuth2Client(process.env.GOOGLE_BACK_ID)
	const ticket = await client.verifyIdToken({
		idToken,
		audience: process.env.GOOGLE_CLIENT_ID,
	})
	return ticket.getPayload()
}

module.exports = {
	googleVerify,
}
