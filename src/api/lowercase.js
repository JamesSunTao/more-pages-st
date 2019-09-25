/* jshint esversion: 6 */
export const toLowerCaseObjKey = (obj) => {
    for (var key in obj) {
      var str = key.replace(/^\S/, function (s) {
        return s.toLowerCase()
      });
      if (str !== key) {
        obj[str] = obj[key];
        delete obj[key];
      }
      if (Array.isArray(obj[str]) || Object.prototype.toString.call(obj[str]) === '[object Object]') {
        obj[str] = toLowerCaseObjKey(obj[str]);
      }
    }
    return obj;
  };