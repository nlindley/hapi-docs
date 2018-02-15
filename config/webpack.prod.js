const Webpack = require('webpack')
const Merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Path = require('path')
const common = require('./webpack.common.js')

module.exports = Merge(common, {
    entry: {
        app: ['./template/js/app.js', './template/scss/app.scss']
    },
    resolve: {
        modules: [Path.join(__dirname, '../node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: { discardComments: { removeAll: true } }
                        }
                    }, 'postcss-loader', 'sass-loader', 'import-glob-loader']
                }),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new Webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new ExtractTextPlugin('assets/css/app.css'),
        new CleanWebpackPlugin('../public', { allowExternal: true })
    ],
    devtool: 'source-map'
})
