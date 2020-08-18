const styles = ({ spacing }) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	titleWrap: {
		overflow: 'hidden',
		marginBottom: spacing(1),
	},
	title: {
		'min-height': spacing(4 * 3),
		display: '-webkit-box',
		'-webkit-line-clamp': 3,
		'-webkit-box-orient': 'vertical',
	},
})

export default styles
