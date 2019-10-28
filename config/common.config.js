
const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nl = require('../src/locale/nl.json');

const dev = (process.env.NODE_ENV === 'development');
const filename = dev ? '[name]' : '[hash]';
const chunkFilename = dev ? '[name]' : '[chunkhash]';

module.exports = {

  entry: {
    index: path.resolve(__dirname, "../src", "index.tsx"),
  },

  output: {
		path: path.join(__dirname, '../dist'),
		filename: `bundles/${ filename }.js`,
		chunkFilename: `chunks/${ chunkFilename }.js`,
		publicPath: '/',
  },
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlPlugin({
			minify: true,
			hash: true,
			title: nl['app.name'],
			noscript: nl['app.noscript'],
			template: path.join(__dirname, '../public', 'index.html'),
			meta: {
				viewport: 'width=device-width, initial-scale=1',
				description: nl['app.description'],
			},
			favicon: 'public/favicon.png'
		}),
		new MiniCssExtractPlugin({
			filename: `bundles/${ filename }.css`,
			chunkFilename: `chunks/${ chunkFilename }.css`,
		})
	],

	module: {
		rules: [
			{ // JSX LOADER
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
				],
			},
			{ // TYPESCRIPT LOADER
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					'ts-loader',
				],
			},
			{ // STYLING
				test: /\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: dev,
							reloadAll: true,
						},
					},
					'css-loader',
					'sass-loader',
				],
			},
			{ // IMAGES AND OTHERS
				test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: `assets/${ filename }.[ext]`,
						}
					},
				]
			}
		]
	}
}