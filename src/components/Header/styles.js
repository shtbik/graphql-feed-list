const styles = theme => ({
	appBar: {
		position: 'relative',
		flexGrow: 1,
	},
	icon: {
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
})

export default styles
