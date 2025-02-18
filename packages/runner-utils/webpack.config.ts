//webpack.config.js
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
	mode: "production",
	devtool: "source-map",
	target: "node",
	optimization: {
		minimize: false,
	},
	entry: {
		index: "./src/index.ts",
	},
	output: {
		libraryTarget: "commonjs",
		path: path.resolve(__dirname, "../../output/crusher-runner-utils"),
		filename: "[name].js", // <--- Will be compiled to this single file
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		plugins: [new TsconfigPathsPlugin({ configFile: path.resolve("./tsconfig.json") })],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				options: {
					transpileOnly: true,
				},
			},
		],
	},
};
