
const merge = require('webpack-merge');
const common = require('./common.config');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
    port: 8080,
    historyApiFallback: true,
    overlay: true,
    open: true,
    stats: 'errors-only'
  },

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
  ]
  
});