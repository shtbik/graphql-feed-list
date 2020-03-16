const styles = theme => ({
	appBar: {
		position: 'relative',
		flexGrow: 1,
	},
	logoIcon: {
		marginRight: theme.spacing(2),
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
		marginLeft: theme.spacing(1),
	},
})

export default styles
