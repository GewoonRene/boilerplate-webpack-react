
const path = require('path');
const common = require('./common.config');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
        terserOptions: {
          mangle: true
        }
	    }),
	    new OptimizeCssAssetsPlugin({}),
	  ],
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
});