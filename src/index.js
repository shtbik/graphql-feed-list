import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'

import { ApolloProvider } from 'react-apollo'
import { createBrowserHistory } from 'history'

// TODO: remove dependency
import { SnackbarProvider } from 'notistack'

import App from 'containers/App'
import client from 'configs/graphql'

const history = createBrowserHistory({
	basename: process.env.PUBLIC_URL,
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router history={history} basename={process.env.PUBLIC_URL}>
			<SnackbarProvider maxSnack={3}>
				<App />
			</SnackbarProvider>
		</Router>
	</ApolloProvider>,
	document.getElementById('root')
)
