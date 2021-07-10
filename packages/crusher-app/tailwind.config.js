/*
@Note - Extend this tailwind config and use dyson tailwind as base
Or use distributed css of dyson
 */
const { spacingSize } = require("../dyson/src/constant/layout");
const { colors, background, border } = require("../dyson/src/constant/color");

module.exports = {
	important: false,
	darkModeVariant: false,
	theme: {
		fontFamily: {
			gilroy: ["Gilroy", "sans-serif"],
			cera: ["Cera Pro", "sans-serif"],
		},
		colors: { ...colors },
		backgroundColor: { ...background },
		borderRadius: spacingSize,
		borderColor: { ...border },
		fontSize: spacingSize,
		extend: {
			margin: spacingSize,
			padding: spacingSize,
		},
		objectPosition: {},
		order: {},
	},
	variants: {
		accessibility: ["focus"],
		alignContent: [],
		alignItems: [],
		alignSelf: [],
		appearance: [],
		backgroundAttachment: [],
		backgroundColor: ["hover", "focus"],
		backgroundPosition: [],
		backgroundRepeat: [],
		backgroundSize: [],
		borderCollapse: [],
		borderColor: ["hover", "focus"],
		borderRadius: [],
		borderStyle: [],
		borderWidth: [],
		boxShadow: ["hover", "focus"],
		cursor: [],
		display: [],
		fill: [],
		flex: [],
		flexDirection: [],
		flexGrow: [],
		flexShrink: [],
		flexWrap: [],
		float: [],
		fontFamily: [],
		fontSize: [],
		fontSmoothing: [],
		fontStyle: [],
		fontWeight: ["hover", "focus"],
		height: [],
		inset: [],
		justifyContent: [],
		letterSpacing: [],
		lineHeight: [],
		listStylePosition: [],
		listStyleType: [],
		margin: [],
		maxHeight: [],
		maxWidth: [],
		minHeight: [],
		minWidth: [],
		objectFit: [],
		objectPosition: [],
		opacity: ["hover", "focus"],
		order: [],
		outline: ["focus"],
		overflow: [],
		padding: [],
		placeholderColor: ["focus"],
		pointerEvents: [],
		position: [],
		resize: [],
		stroke: [],
		tableLayout: [],
		textAlign: [],
		textColor: ["hover", "focus"],
		textDecoration: ["hover", "focus"],
		textTransform: [],
		userSelect: [],
		verticalAlign: [],
		visibility: [],
		whitespace: [],
		width: [],
		wordBreak: [],
		zIndex: [],
	},
	corePlugins: {
		float: false,
		translate: false,
		gradientColorStops: false,
		skew: false,
		scale: false,
		gridAutoFlow: false,
		gridColumn: false,
		gridColumnEnd: false,
		gridColumnStart: false,
		gridRow: false,
		gridAutoColumns: false,
		gridRowEnd: false,
		gridRowStart: false,
		gridTemplateColumns: false,
		gridTemplateRows: false,
	},
	plugins: [],
};
