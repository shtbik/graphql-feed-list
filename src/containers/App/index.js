import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Error404 from 'components/Error404'
import routes from 'routes'

import styles from './styles'

const App = ({ classes }) => (
	<Fragment>
		<Header />
		<main className={classes.mainBlock}>
			<Switch>
				{routes.map(({ component: Component, path, exact }) => (
					<Component path={path} exact={exact} key={path} />
				))}
				<Route exact component={Error404} />
			</Switch>
		</main>
		<Footer />
	</Fragment>
)

App.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
