const webpack = require('webpack');
const path = require('path');

module.exports = {
    name: 'client',
    devtool: 'source-map',
    entry: {
        app: './src/HexEngine'
    },
    target: ['web'],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    output: {
        filename: "hexgame.bundle.js",
        path: path.resolve(__dirname, "dist"),
        library: {
            name: 'HexEngine',
            type: 'umd'
        }
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'APP_VERSION': JSON.stringify('1.0.0-alpha')
            }
        })
    ]

}
