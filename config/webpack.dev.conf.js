const json = require('../package.json');
const webpackFile = require('./webpack.file.conf'); // 路径配置
const path = require('path');
const webpack = require('webpack');
const opn = require('opn') //打开浏览器
const eslintFormatter = require('react-dev-utils/eslintFormatter');


module.exports = {
    entry: {
        index: [
            'babel-polyfill',
            'react-hot-loader/patch',
            path.join(__dirname,'../app/index.js')],
        vendor: Object.keys(json.dependencies),
    
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css', '.pcss', '.less']
    },
    output: {
        path: path.resolve(webpackFile.devDirectory),
        filename: 'js/[name].js',
        chunkFilename:'js/[name]-[id].js',
        publicPath:'',
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        // 设置开发环境
        new webpack.DefinePlugin({ // 定义全局常量
            "process.env": {
                NODE_ENV: JSON.stringify('develpment')
                    //  NODE_ENV:JSON.stringify('production')
            }
        }),
        // 设置热更新
        new webpack.HotModuleReplacementPlugin(),
        // co公共代码，vendor引入第三方mmon 业务
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor"]
        }),
        // 防止 vender hash 变化
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        })
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
                use: ['cache-loader', 'react-hot-loader/webpack','babel-loader'],
                include: [
                    path.resolve(__dirname, '../app'),
                ],
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ]
            },
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [{
                    options: {
                        formatter: eslintFormatter,
                        eslintPath: require.resolve('eslint'),
                        // @remove-on-eject-begin
                        baseConfig: {
                            extends: [require.resolve('eslint-config-react-app')],
                        },
                        //ignore: false,
                        useEslintrc: false,
                        // @remove-on-eject-end
                    },
                    loader: require.resolve('eslint-loader'),
                }, ],
                include: [
                    path.resolve(__dirname, "../app")
                ],
                exclude: [
                    path.resolve(__dirname, "../node_modules")
                ],
            },
            {
                test: /\.(css|pcss|less)$/,
                loader: 'style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap!less-loader?sourceMap',
                exclude: /node_modules/
            },

            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
                loader: 'url-loader?name=[name].[ext]&outputPath=' + webpackFile.resource + '/'
            }

        ]
    },

        // 设置api转发
        devServer:{
            host:"0.0.0.0",
            port:8080,
            hot:true,
            inline:true,
            contentBase:path.resolve(webpackFile.devDirectory), //告诉服务器从哪里提供内容, 打开build文件夹
            historyApiFallback:true,
            disableHostCheck:true,
            proxy:[
                {
                    context:['/nsi-1.0/**','/u/**'],
                    target:'http://192.168.0.119:8080',
                    secure:false
                }
            ],
             // 打开浏览器 并打开项目网址
            after(){
                opn('http://localhost:'+this.port)
            }
        },

}