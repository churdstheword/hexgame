const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'client',
    entry: {
        app: './src/index.js'
    },
    target: 'web',
    output: {
        filename: "hexgame.bundle.js",
        path: path.resolve(__dirname, "dist"),
        library: {
            name: 'hexgame',
            type: 'umd'
        }
    },
    mode: 'development',
    module: {
        rules: [
            { test: /\s[ac]ss$/i, use: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.handlebars$/, loader: 'handlebars-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/assets/index.handlebars',
            title: 'Hex Game',
            favicon: './src/assets/favicon.ico'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'APP_VERSION': JSON.stringify('1.0.0-alpha')
            }
        })
    ]

}
