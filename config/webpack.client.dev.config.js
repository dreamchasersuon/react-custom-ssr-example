const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');

const CURRENT_WORKING_DIR = process.cwd();
const clientPath = path.resolve(CURRENT_WORKING_DIR, 'client');

module.exports = {
    name: 'client',
    target: 'web',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true',
        './index.jsx'
    ],
    mode: 'development',
    context: clientPath,
    output: {
        filename: 'client.js',
        path: path.resolve(CURRENT_WORKING_DIR, '.static'),
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        plugins: ['react-refresh/babel']
                    }
                },
                include: clientPath,
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: [clientPath, 'node_modules'],
    },
    devtool: 'eval-source-map',
    plugins: [
        new WebpackManifestPlugin({
            fileName: '../manifest.json',
            publicPath: `/static/`
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin({
            overlay: false
        }),
        new webpack.SourceMapDevToolPlugin({})
    ]
};
