const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entryDir = path.resolve(__dirname,'../src/pages/');

exports.entryFiles = function() {
	let entryFiles = glob.sync(entryDir + '/*');
	let pagesArr = {};
	entryFiles.forEach((filePath) => {
		let fileName = filePath.split('/').pop();
		pagesArr[fileName] = `${filePath}/${fileName}.js`;
    })
    pagesArr['vendor'] =  ['jquery', 'vue', 'vue-router', 'vuex'];
	return pagesArr;
}

exports.htmlPlugins = function(){
  let entryHtml = glob.sync(entryDir + '/*');
	let htmlArr = [];
	entryHtml.forEach((filePath) => {
		let fileName = filePath.split('/').pop();
		let conf = {
			template: `${filePath}/${fileName}.html`,
			filename: `${fileName}.html`,	
			title:`${fileName}页面`,
			minify: {
				// 压缩 HTML 文件
				removeComments: true, // 移除 HTML 中的注释
				collapseWhitespace: true, // 删除空白符与换行符
				minifyCSS: true // 压缩内联 css
			},
			chunks: ['vendor','base',fileName],		
		};
		htmlArr.push(new HtmlWebpackPlugin(conf));
	});
	return htmlArr;
}
