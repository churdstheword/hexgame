const path = require('path');

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
    mode: 'development'
}
