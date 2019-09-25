const path = require('path');
const merge = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css
const commonConfig = require('./webpack.common');
const utils = require('./prod.utils');

const outputDir = path.resolve(__dirname, '../dist');

const prodConfig = {
    mode:"production",
    // devtool: "cheap-module-source-map",
    entry: utils.entryFiles(),
    output: {
       path: outputDir,
       filename: 'js/[name].[hash:6].js', // 代码打包后的文件名
       chunkFilename: 'js/[name].[chunkhash:6].js', // 代码拆分后的文件名
   },
    module: {
        rules:[
                      
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name:'base',
                    chunks: 'initial',                 
                }               
            }
        }
    },
    plugins: [
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano           
      }),
  
      new CleanWebpackPlugin(), // 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产。   
      ...utils.htmlPlugins()  //HtmlWebpackPlugin
    ],
}

module.exports = merge(commonConfig,prodConfig);
