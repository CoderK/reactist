module.exports = `
'use strict';

const path = require('path');
const webpack = require("webpack");

let envIndex = process.argv.indexOf("--env");
let env = null;
let outputFilename = "bundle.js";

if (envIndex > -1) {
    env = process.argv[envIndex + 1];
}

if(env === "production"){
    outputFilename = "bundle.min.js";
}

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: outputFilename
    },
    devtool: env === "production" ? false : 'inline-source-map',
    devServer: {
        contentBase: "./dev-server"
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                loader: ['babel-loader'],
                query: {
                    presets: ['es2015', 'react', 'airbnb']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': env
            }
        })
    ],
    $[ENZYME_PLACEHOLDER]$
};
`;