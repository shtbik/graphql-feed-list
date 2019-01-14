import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'

import Header from 'components/Header'
import Footer from 'components/Footer'
import routes from 'routes'

import styles from './styles'

function App(props) {
	const { classes } = props

	return (
		<Fragment>
			<Header />
			<main className={classes.mainBlock}>
				{/* <HeroUnit /> */}
				{/* <div className={classNames(classes.layout, classes.content)}> */}
				<Switch>
					{routes.map(({ component: Component, path, exact }) => (
						<Component path={path} exact={exact} key={path} />
					))}
				</Switch>
				{/* </div> */}
			</main>
			<Footer />
		</Fragment>
	)
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
