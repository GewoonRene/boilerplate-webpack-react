const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, "../src", "index.tsx"),
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/"
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
        overlay: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: [/node_modules/],
                use: [{ 
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-typescript",
                            "@babel/preset-react",
                            {
                                'plugins': [
                                    '@babel/plugin-proposal-class-properties',
                                    "@babel/proposal-object-rest-spread",
                                    "@babel/plugin-transform-runtime"
                                ]
                            }
                        ]
                    }
                }]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name]_[hash:7].[ext]',
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, '../public', 'index.html'),
        }),
        new FaviconsWebpackPlugin('./public/favicon.png')
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
}