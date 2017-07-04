const path = require('path')
	, webpack = require('webpack')
	, ExtractTextPlugin = require("extract-text-webpack-plugin")
	, WebpackCleanupPlugin = require("webpack-cleanup-plugin")
	, HtmlWebpackPlugin = require('html-webpack-plugin')

const AUTOPREFIXER_BROWSERS = [
	'Android 2.3',
	'Android >= 4',
	'Chrome >= 35',
	'Firefox >= 31',
	'Explorer >= 9',
	'iOS >= 7',
	'Opera >= 12',
	'Safari >= 7.1',
];


const postcss = {
	loader: 'postcss-loader',
	options: {
		plugins: () => ([
			require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
		]),
	},
}


module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		index: ['./index.jsx'],
	},
	output: {
		path: path.resolve(__dirname, './public'),
		filename: '[name].js',
	},
	module: {
		rules: [{
			test: /\.csss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				//resolve-url-loader may be chained before sass-loader if necessary
				use: ['css-loader?importLoaders=1', postcss]
			})
		},
		{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				//resolve-url-loader may be chained before sass-loader if necessary
				use: ['css-loader?importLoaders=1', 'sass-loader', postcss], 
			})
		},
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				"presets": ["es2015", "stage-0", "react"]
			}
		},
		{
			test: /\.json$/,
			use: 'json-loader'
		}]
	},
	plugins: [
		new WebpackCleanupPlugin(),
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true,
		}),
		new HtmlWebpackPlugin({
			template: './template.html',
		}),
	],
};