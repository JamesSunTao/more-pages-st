const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.common');
const entryDir = path.resolve(__dirname,'../src/pages/');
const outputDir = path.resolve(__dirname, '../dist/');
const entryPage = process.env.ENTRY_PAGE;

//不同浏览器存放cookie的对象
const cookieMap = {};
//去掉域名的sso登录地址
const ssoUrl = '/sso/login?appid=CRSP_PSMC_DEV&returnurl=%2Fpsmc';
//默认打开页，为空时写'/'
const openPage = `/${entryPage}.html`;

// 设置cookie
const setCookie = (userAgent, cookies) => {
  let map = cookieMap[userAgent] || {};
  cookies.forEach((cookie) => {
    let [string, key, value] = cookie.match(/^(.*?)=(.*?);/);
    map[key] = value;
  });
  cookieMap[userAgent] = map;
}

// 获取cookie
const getCookie = (userAgent) => {
  let map = cookieMap[userAgent] || {};
  let cookie = '';
  for(let key in map) {
    cookie += `${key}=${map[key]};`
  }
  return cookie;
}

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
        // index:'',
        historyApiFallback: true,
        inline: true,
        open:true,
        // port:3000,
        hot:true,  //热更新
        hotOnly:true,//热更新
        proxy: [{
            context: ["/read"],
            target: "http://x.dev.cnki.net",
            changeOrigin: true,   
            // 监听代理请求，将cookie插入到请求头
            onProxyReq(proxyReq, req, res) {
              proxyReq.setHeader('Cookie', getCookie(req.get('User-Agent')));
            },
            // 监听代理返回，将返回头中的cookie存起来
            onProxyRes(proxyRes, req, res) {
              if(proxyRes.headers['set-cookie']) {
                setCookie(req.get('User-Agent'), proxyRes.headers['set-cookie']);
              }
            }
          },
           {
            context: ['/sso'],
            target: "http://sso.dev.cnki.net",
            changeOrigin: true,
            onProxyRes(proxyRes, req, res) {
              if(proxyRes.statusCode === 302) {              
                if(proxyRes.headers['set-cookie']) {
                  setCookie(req.get('User-Agent'), proxyRes.headers['set-cookie']);
                }
                proxyRes.headers['Location'] = openPage;               
              }
            }
          },
           {
            context: ['/'],
            bypass: function(req, res, proxyOptions) {         
              if (req.url == '/' && !cookieMap[req.get('User-Agent')]) {
                res.redirect(ssoUrl);
                return true;
              } else if (/^\/login/.test(req.url)) {
                delete cookieMap[req.get('User-Agent')];
                res.redirect(ssoUrl);
                return true;
              }
            }
          }
        ]
    },
    module: {
        rules:[
          
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            // 打包输出HTML
            title: `${entryPage}页面`,
            filename: `${entryPage}.html`, // 生成后的文件名
            template: path.resolve(entryDir,`${entryPage}/${entryPage}.html`), // 根据此模版生成 HTML 文件          
        }),
    ],
}

module.exports = merge(commonConfig,devConfig);
