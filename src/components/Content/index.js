import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const Content = ({ children, classes }) => (
	<div className={classNames(classes.layout, classes.content)}>{children}</div>
)

Content.propTypes = {
	children: PropTypes.node.isRequired,
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Content)
