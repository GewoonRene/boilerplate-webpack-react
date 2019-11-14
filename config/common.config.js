
const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nl = require('../src/utils/locale/nl.json');

const dev = (process.env.NODE_ENV === 'development');
const filename = dev ? '[name]' : '[hash]';
const chunkFilename = dev ? '[name]' : '[chunkhash]';

/**
 * @param {boolean} modules
 * @returns {Object}
*/

const less = (modules) => ({
	test: /\.less$/,
	use: [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hmr: dev,
				reloadAll: true,
			},
		},
		{
			loader: 'css-loader',
			options: {
				importLoaders: 1,
				localsConvention: 'dashes',
				modules: modules && {
	        localIdentName: dev ? '[local]' : "[hash:base64:5]",
	    	},	
			},
		},
		{
			loader: 'less-loader',
			options: {
				javascriptEnabled: true,
			},
		},
	],
	[modules ? 'include' : 'exclude']: /\.module\.less$/,
});

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
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@containers': path.resolve(__dirname, '../src/containers'),
      '@context': path.resolve(__dirname, '../src/context'),
      '@types': path.resolve(__dirname, '../src/types'),
      '@utils': path.resolve(__dirname, '../src/utils'),
    }
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: `bundles/${ filename }.css`,
			chunkFilename: `chunks/${ chunkFilename }.css`,
		}),
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
		})
	],

	module: {
		rules: [
			less(true),
			less(false),
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