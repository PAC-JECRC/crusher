const { IS_PRODUCTION, GITHUB_CONFIG, SLACK_CONFIG, FRONTEND_URL, BACKEND_URL } = require('../config');

module.exports = {
	CRUSHER_APP_ENV: {
		NODE_ENV: IS_PRODUCTION ? 'production' : 'development',
		NEXT_PUBLIC_BACKEND_URL: BACKEND_URL,
		INTERNAL_BACKEND_URL: BACKEND_URL,
		NEXT_PUBLIC_IS_DEVELOPMENT: !IS_PRODUCTION,
		NEXT_PUBLIC_FRONTEND_URL: FRONTEND_URL,
		/* Github API Config */
		NEXT_PUBLIC_GITHUB_APP_CLIENT_ID: GITHUB_CONFIG.APP_CLIENT_ID,
		NEXT_PUBLIC_GITHUB_APP_CLIENT_SECRET: GITHUB_CONFIG.APP_CLIENT_SECRET,
		NEXT_PUBLIC_GITHUB_APP_PUBLIC_LINK: GITHUB_CONFIG.APP_PUBLIC_LINK,
		/* Slack API Config */
		NEXT_PUBLIC_SLACK_CLIENT_ID: SLACK_CONFIG.CLIENT_ID,
	},
};
