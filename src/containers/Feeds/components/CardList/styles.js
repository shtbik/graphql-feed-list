const styles = theme => ({
	error: {
		textAlign: 'center',
		padding: '50px',
		...theme.typography.subtitle1,
	},
	loader: {
		position: 'relative',
		height: '300px',
	},
})

export default styles
