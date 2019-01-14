import FeedList from 'containers/FeedList'
import AddFeed from 'containers/AddFeed'
import Auth from 'containers/Auth'

const routes = [
	{
		path: '/',
		component: FeedList,
		exact: true,
	},
	{
		path: '/add-feed',
		component: AddFeed,
		exact: true,
	},
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

export default routes
