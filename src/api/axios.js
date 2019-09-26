import axios from 'axios'
import qs from 'qs'


const isObject = (data) => {
  return Object.prototype.toString.call(data) === '[object Object]';
}

const logError = (param, error) => {
  console.log('参数:', param, '错误信息:', error);
};

export const request = (url, type, data) => {
  let param = {};
  if (isObject(url)) {
    param = url;
  } else {
    param.url = '/read/' + url;
  }
  if (data) data = qs.stringify(data);
  return new Promise((resolve, reject) => {

    axios({
      method: type,
      url: param.url,
      headers: {
        //这里的请求头与后台商量设置
        'content-Type': 'application/x-www-form-urlencoded'
      },
      data: data 
    })
      .then(res => {
        if (isObject(result) && 'code' in result && result.code !== 200) {
          logError(param, result);
        }
        //这里可以添加指定对应状态码的处理方式,比如登陆过期,res.data.code === '6666' 路由跳转到login
        reslove(res);
      })
      .catch(err => {
        logError(param, err);
        if (err && err.status) reject(err.status);
        else reject();
       
      });
  });

};

export const dealResult = (result) => {
  if (result.code === 200) {
    return result.data;
  } else {
    throw result.data;
  }
};

export const dealResultForBool = (result) => {
  if (typeof result !== 'boolean') result = dealResult(result);
  if (result) return result;
  throw result;
}

export const get = (url, data) => {
  return request(url, 'get', data);
};

export const post = (url, data) => {
  return request(url, 'post', data);
};

export default {
  request,
  get,
  post,
  dealResult,
  dealResultForBool
}