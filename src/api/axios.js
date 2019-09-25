import qs from 'qs';
import axios from 'axios';

let baseUrl = '/read/'; //设置你的baseUrl


//返回数据拦截器
axios.interceptors.response.use(res => {
 
    const {code, data } = res.data;
    if (code == '200') {
      //登陆后做出一些本地的处理，按需加载,()
      //...................
    }
   
  
  return res;
});

const logError = (param, error) => {
    console.log('参数:', param, '错误信息:', error);
  };

//封装请求方法
function formatReq(type, url, data) {
  return new Promise((reslove, reject) => {
    axios({
      method: type,
      url: `${baseUrl}${url}`,
      headers: {
        //这里的请求头与后台商量设置
        'content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(data) //java后台用qs转
      // data:JSON.stringify(data)//PHP后台用JSON转
    })
    .then(res => {
        //这里可以添加指定对应状态码的处理方式,比如登陆过期,res.data.code === '6666' 路由跳转到login
        reslove(res.data);
    })
    .catch(err => {
        logError(data, err);
        if (err && err.status) reject(err.status);
        else reject();
    });
  });
}

const Http = {
  get: (url, data) => formatReq('get', url, data),
  post: (url, data) => formatReq('post', url, data)
};

export default Http;