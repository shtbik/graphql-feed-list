const styles = ({ spacing, breakpoints }) => ({
	layout: {
		width: 'auto',
		marginLeft: spacing(3),
		marginRight: spacing(3),
		[breakpoints.up(1100 + spacing(3) * 2)]: {
			width: 1100,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	content: {
		padding: `${spacing(8)}px 0`,
	},
})

export default styles
