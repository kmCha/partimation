var webpack = require("webpack");
var path = require("path");

if (process.env.NODE_ENV === "development") {
    console.log(process.env.NODE_ENV)
    module.exports = {
        entry: "./src/partimation.js",
        output: {
            path: path.resolve(__dirname, './dist/'),
            publicPath: "/",
            filename: "index.js",
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
        }
    };
} else if (process.env.NODE_ENV === "production") {
    module.exports = {
        entry: "./src/partimation.js",
        output: {
            path: path.resolve(__dirname, './dist/'),
            publicPath: "/",
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
}
