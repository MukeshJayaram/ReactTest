var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: "./app.js",
	output: {
		filename: "bundle.js"
	},
    module : {
        loaders : [
            {
                test : /\.js?/,
                exclude: /node_modules/,
                loader : 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    }

}