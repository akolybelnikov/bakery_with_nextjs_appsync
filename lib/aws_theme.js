import {theme} from '../styles/utils'

export const AwsTheme = {
	button: {
		backgroundColor: theme.primary,
	},
	navButton: {
		backgroundColor: theme.primary,
	},
	a: {
		color: theme.primary,
	},
	container: {
		color: theme.info,
		minWidth: '300px',
	},
	formContainer: {
		color: theme.info,
		minWidth: theme.minWidth,
	},
	formSection: {
		color: theme.info,
		minWidth: theme.minWidth,
	},
	formField: {
		color: theme.info,
	},
	sectionHeader: {
		color: theme.info,
	},
	sectionBody: {
		color: theme.info,
	},
	sectionFooter: {
		color: theme.info,
		justifyContent: `space-between`,
	},
	sectionFooterPrimaryContent: {
		color: theme.info,
	},
	sectionFooterSecondaryContent: {
		color: theme.info,
		marginRight: `10px`,
	},
	input: {
		color: theme.info,
		border: `1px solid ${theme.info}`,
	},
	inputLabel: {
		color: theme.info,
	},
	hint: {
		color: theme.info,
	},
	toast: {
		backgroundColor: theme.primary
	},
	navItem: {
		display: `block`,
	},
};