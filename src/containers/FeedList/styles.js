const styles = theme => ({
	cardGrid: {
		padding: `${theme.spacing.unit * 8}px 0`,
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	error: {
		textAlign: 'center',
		padding: '50px',
		...theme.typography.subtitle1,
	},
})

export default styles
