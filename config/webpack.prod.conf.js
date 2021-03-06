const path = require('path');
const webpack = require('webpack');
const json = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpackFile = require('./webpack.file.conf');

let config = {
    entry: {
        index: './app/index.js',
        vendor: Object.keys(json.dependencies),
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css', '.pcss', '.less']
    },
    output: {
        path: path.resolve(webpackFile.proDirectory),
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: "js/[name]-[id].[chunkhash:8].js",
    },
    plugins: [
        // 设置生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            }
        }),
        /* common 业务公共代码，vendor引入第三方 */
        new webpack.optimize.CommonsChunkPlugin({
            name: ["common", "vendor"],
        }),
        /* 防止 vendor hash 变化 */
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // extract css into its own file
        new ExtractTextPlugin('css/[name].[contenthash:8].css'),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                // 避免 cssnano 重新计算 z-index
                safe: true
            },
            canPrint: true
        }),
        /*压缩js代码*/
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false /*删除版权信息*/
            },
            compress: {
                warnings: false
            }
        }),
    ],
    module: {
        rules: [{
                test: /\.bundle\.jsx$/,
                use: {
                    loader: 'bundle-loader',
                    options: {
                        lazy: true,
                        name: '[name]'
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(css|pcss|less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader!less-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
                loader: 'url-loader?limit=8192&name=[name].[hash:8].[ext]&publicPath=' + webpackFile.resourcePrefix + '&outputPath=' + webpackFile.resource + '/'
            },
            {
                test: /\.swf$/,
                loader: 'file?name=js/[name].[ext]'
            }
        ]
    }
}

    let conf = {
        filename: 'index.html',
        template: 'index.html',
        inject: true,
        title: 'react-redux长期更新项目',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunks: ['manifest', 'vendor', 'index'],
        hash: false,
        chunksSortMode: 'dependency'
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));

/* 清除 pc */
config.plugins.push(webpackFile.cleanFun([webpackFile.proDirectory]));
/* 拷贝静态资源  */
webpackFile.copyArr.map(function(data) {
    return config.plugins.push(data)
});
module.exports = config;