import { iDevice } from '../types/extension/device';

const devices : Array<iDevice> =  [
	// {
	// 	id: 'iphoneXRXSMax',
	// 	name: 'iPhone XR, XSMax',
	// 	width: 414,
	// 	height: 896,
	// 	visible: true,
	// 	mobile: true,
	// 	userAgent: 'iPhone',
	// },
	// {
	// 	id: 'iPhone8Plus87Plus',
	// 	name: 'iPhone 8+, 8, 7+',
	// 	width: 414,
	// 	height: 736,
	// 	mobile: true,
	// 	visible: false,
	// 	userAgent: 'iPhone',
	// },
	// {
	// 	id: 'iPhone76S6',
	// 	name: 'iPhone 7, 6S, 6',
	// 	width: 375,
	// 	height: 667,
	// 	mobile: true,
	// 	visible: false,
	// 	userAgent: 'iPhone',
	// },
	// {
	// 	id: 'GalaxyS9PlusS8Plus',
	// 	name: 'Galaxy S9+, S8+',
	// 	width: 412,
	// 	height: 846,
	// 	visible: true,
	// 	mobile: true,
	// 	userAgent: 'Samsung Phone',
	// },
	// {
	//     id: "GalaxyS9NOte8S8",
	//     name: 'Galaxy S9, Note 8, S8',
	//     width: 360,
	//     height: 740,
	//     visible: true,
	//     userAgent: 'Samsung Phone',
	// },
	{
		id: 'Pixel33XL',
		name: 'Mobile',
		width: 393,
		height: 786,
		visible: true,
		mobile: true,
		userAgent: 'Google Pixel',
	},
	// {
	// 	id: 'GoogleChromeNormalScreen',
	// 	name: 'Desktop (1024 * 800)',
	// 	width: 1024,
	// 	height: 800,
	// 	visible: true,
	// 	userAgent: 'Google Chrome',
	// },
	{
		id: 'GoogleChromeMediumScreen',
		name: 'Desktop M',
		width: 1280,
		height: 800,
		visible: true,
		userAgent: 'Google Chrome',
	},
	{
		id: 'GoogleChromeLargeScreenL',
		name: 'Desktop L',
		width: 1440,
		height: 800,
		visible: true,
		userAgent: 'Google Chrome',
	},
	// {
	// 	id: 'GoogleChromeLargeScreenXL',
	// 	name: 'Desktop XL (1600 * 800)',
	// 	width: 1600,
	// 	height: 800,
	// 	visible: true,
	// 	userAgent: 'Google Chrome',
	// },
];

export default devices;
