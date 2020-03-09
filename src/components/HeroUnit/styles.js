const styles = theme => ({
	heroUnit: {
		backgroundColor: theme.palette.background.paper,
	},
	heroContent: {
		maxWidth: 600,
		margin: '0 auto',
		padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
})

export default styles
