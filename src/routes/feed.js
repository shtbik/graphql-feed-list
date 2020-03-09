import Feeds from 'containers/Feeds'
import AddFeed from 'containers/AddFeed'

export default [
	{
		path: '/',
		component: Feeds,
		exact: true,
	},
	{
		path: '/add-feed',
		component: AddFeed,
		exact: true,
	},
]
