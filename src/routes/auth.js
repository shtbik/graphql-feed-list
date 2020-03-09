import Auth from 'containers/Auth'

export default [
	{
		path: '/sign-in',
		component: Auth,
		exact: true,
	},
	{
		path: '/sign-up',
		component: Auth,
		exact: true,
	},
]
