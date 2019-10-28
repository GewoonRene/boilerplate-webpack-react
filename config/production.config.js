
const path = require('path');
const common = require('./common.config');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  mode: 'production',
	devtool: '(none)',
	optimization: {
		splitChunks: {
			chunks: 'all',
	  },
	  minimizer: [
	    new TerserPlugin({
	    	cache: true,
	    	parallel: true,
	    }),
	    new OptimizeCssAssetsPlugin({}),
	  ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
			defaultSizes: 'gzip',
			logLevel: 'debug',
		})
  ]
});