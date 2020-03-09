const styles = theme => ({
	error: {
		textAlign: 'center',
		padding: '50px',
		...theme.typography.subtitle1,
	},
	searchBlock: {
		marginBottom: '30px',
	},
	loader: {
		position: 'relative',
		height: '300px',
	},
})

export default styles
