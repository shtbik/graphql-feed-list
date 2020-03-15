import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'

import { ApolloProvider } from '@apollo/react-hooks'
import { createBrowserHistory } from 'history'

// TODO: remove dependency
import { SnackbarProvider } from 'notistack'

import Layout from 'containers/Layout'
import client from 'gql/client'

const history = createBrowserHistory({
	basename: process.env.PUBLIC_URL,
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router history={history} basename={process.env.PUBLIC_URL}>
			<SnackbarProvider maxSnack={3}>
				<Layout />
			</SnackbarProvider>
		</Router>
	</ApolloProvider>,
	document.getElementById('root')
)
