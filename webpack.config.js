var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: "./src/partimation.js",
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: "index.min.js",
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
