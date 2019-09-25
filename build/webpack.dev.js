const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.common');
const entryDir = path.resolve(__dirname,'../src/pages/');
const outputDir = path.resolve(__dirname, '../dist/');
const entryPage = process.env.ENTRY_PAGE;


const devConfig = {
    mode:"development",
    devtool: "cheap-module-eval-source-map",
    entry: {
        main:path.resolve(entryDir,`${entryPage}/${entryPage}.js`),
     },
     output: {
         path: outputDir,
         filename: 'static/js/[name]-[hash:6].js', // 代码打包后的文件名
         chunkFilename:'static/js/[name]-[hash:6].js' // 代码拆分后的文件名
     },
    devServer: {
        //  contentBase:'../dist/',
        index:`${entryPage}.html`,
        historyApiFallback: true,
        inline: true,
        open:true,
        // port:3000,
        hot:true,  //热更新
        hotOnly:true,//热更新
        proxy: [{
          context: ['/read'],
          target: 'http://x.dev.cnki.net',
          changeOrigin: true
        }]
    },
    module: {
        rules:[
          
           
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            // 打包输出HTML
            title: `${entryPage}页面`,
            filename: `${entryPage}.html`, // 生成后的文件名
            template: path.resolve(entryDir,`${entryPage}/${entryPage}.html`), // 根据此模版生成 HTML 文件
            minify: {
              // 压缩 HTML 文件
              removeComments: true, // 移除 HTML 中的注释
              collapseWhitespace: true, // 删除空白符与换行符
              minifyCSS: true // 压缩内联 css
            }
        }),
    ],
}

module.exports = merge(commonConfig,devConfig);
