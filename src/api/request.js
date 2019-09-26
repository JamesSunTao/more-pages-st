/* jshint esversion: 6 */
import { toLowerCaseObjKey } from './lowercase'

$.ajaxSetup({
  success(res) {
    // 首字母转小写
    toLowerCaseObjKey(res);
    // 判断是否账号登出
    if (res && ([401, 'kicked'].indexOf(res.code) > -1 || (res.type === 'sso' && !res.success))) {
    //  window.InitData.loginshow = true; 
      // location.href = location.origin;
      debugger
      // window.InitData.message = res.message;    
      // store.commit("setOffLine",true);
    }else{
      // store.commit("setOffLine",false);
    }
  }
});

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
  param.type = type;
  param.dataType = 'json';
  if (data) param.data = data;
  return new Promise((resolve, reject) => {
    $.ajax(param).then((result) => {
      if (isObject(result) && 'code' in result && result.code !== 200) {
        logError(param, result);
      }
      resolve(result);
    }).fail((err) => {
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