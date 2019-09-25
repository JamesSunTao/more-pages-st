const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 将 css 单独打包成文件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const devMode = process.argv.indexOf('-p') === -1;
const entryDir = path.resolve(__dirname,'../src/pages/');

module.exports = {
    resolve: {
      // 后缀自动补全
      extensions: ['.js', '.vue'],
      alias: {
        // vue官网有说明      
        'vue$': 'vue/dist/vue.esm.js',
        'vue': 'vue/dist/vue.esm.js',
        // 定义@符号来指代src目录
        '@': path.resolve(__dirname, '../src')
      }
    },
    plugins: [
        new VueLoaderPlugin(),
        // new HtmlWebpackPlugin({
        //     // 打包输出HTML
        //     title: 'webpack 项目模板',
        //     filename: 'index.html', // 生成后的文件名
        //     template: path.resolve(entryDir,'pdf/index.html'), // 根据此模版生成 HTML 文件
        //     minify: {
        //       // 压缩 HTML 文件
        //       removeComments: true, // 移除 HTML 中的注释
        //       collapseWhitespace: true, // 删除空白符与换行符
        //       minifyCSS: true // 压缩内联 css
        //     }
        // }),
        new MiniCssExtractPlugin({
          filename: devMode ? 'css/[name].css' : 'css/[name]-[chunkhash:6].css',
          chunkFilename: devMode ? 'css/[id].css' : 'css/[id]-[chunkhash:6].css',
        }),
        new webpack.ProvidePlugin({                
            '$': "jquery",               
            'jQuery': "jquery", 
            'window.jQuery': 'jquery'               
        })      
    ],
    module: {
        rules: [
          {
            test: /\.js$/, // 使用正则来匹配 js 文件
            exclude: /node_modules/, // 排除依赖包文件夹
            use: {
              loader: 'babel-loader' // 使用 babel-loader
            }
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [               
                {
                   loader: devMode?'style-loader':MiniCssExtractPlugin.loader,
                },   
                {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 2  //在一个 css 中引入了另一个 css，也会执行之前两个 loader，即 postcss-loader 和 sass-loader
                    }
                },
                'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
                'sass-loader',
            ],
          },
          {
            test: /\.(png|jpg|jpeg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  name: '[name][hash:5].[ext]',
                  outputPath: 'static/images', //输出到 images 文件夹
                  limit: 20000 //把小于 20kb 的文件转成 Base64 的格式
                }
              }
            ]
          },
          {
            test: /\.(eot|woff2?|ttf|svg)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  name: '[name]-[hash:5].min.[ext]',
                  limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                  publicPath: 'fonts/',
                  outputPath: 'static/fonts/'
                }
              }
            ]
          },
          {
            test: require.resolve('jquery'),
            use: {
              loader: 'expose-loader',
              options: '$'
            }
          }
        ]
      }      
};