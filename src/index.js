import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloProvider } from 'react-apollo'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { SnackbarProvider } from 'notistack'

import App from 'containers/App'
import client from 'configs/graphql'

import './styles/index.css'
import * as serviceWorker from './serviceWorker'

const history = createBrowserHistory()

// const Context = React.createContext();

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router history={history}>
			<SnackbarProvider maxSnack={3}>
				<App />
			</SnackbarProvider>
		</Router>
	</ApolloProvider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
