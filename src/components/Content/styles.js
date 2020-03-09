const styles = theme => ({
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up(1100 + theme.spacing(3) * 2)]: {
			width: 1100,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	content: {
		padding: `${theme.spacing(8)}px 0`,
	},
})

export default styles
