const path = require('path');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');

const CURRENT_WORKING_DIR = process.cwd();
const serverPath = path.resolve(CURRENT_WORKING_DIR, 'server');
const clientPath = path.resolve(CURRENT_WORKING_DIR, 'client');

module.exports = {
    name: 'server',
    mode: 'development',
    target: 'node',
    context: serverPath,
    entry: ['./index.js'],
    externals: [webpackNodeExternals()],
    output: {
        filename: 'server.js',
        path: path.resolve(CURRENT_WORKING_DIR, '.build'),
        publicPath: '/static/'
    },
    resolve: {
        modules: [serverPath, 'node_modules'],
    },
    optimization: {
        minimize: false
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.js$|\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false
                    }
                },
                include: [serverPath, clientPath],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [new webpack.SourceMapDevToolPlugin({})]
};
