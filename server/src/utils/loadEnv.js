const { config } = require('dotenv')
const path = require('path')

const mode = process.env.MODE || 'local'

const modes = {
	local: path.join(__dirname, '../../.env.local'),
	dev: path.join(__dirname, '../../.env.dev'),
	prod: path.join(__dirname, '../../.env.prod'),
}

const dotEnvVariables = config({ path: modes[mode] })

if (!dotEnvVariables.parsed) {
	console.error(`Didn't find .env.${mode}, will use process.env`, dotEnvVariables.error)
}

module.exports = {
	...dotEnvVariables.parsed,
}
