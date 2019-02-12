const styles = theme => {
	console.log(theme)
	return {
		appBar: {
			position: 'relative',
			flexGrow: 1,
		},
		logoIcon: {
			marginRight: theme.spacing.unit * 2,
		},
		logo: {
			flexGrow: 1,
			'& a': {
				color: 'white',
				textDecoration: 'none',
				cursor: 'pointer',
			},
		},
		icon: {
			marginLeft: theme.spacing.unit,
		},
	}
}

export default styles
