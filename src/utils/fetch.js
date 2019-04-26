// require('fetch-ie8');
var AES = require("crypto-js/aes");
var HmacMD5 = require("crypto-js/hmac-md5");
var CryptoJs = require("crypto-js");
var store = require('store');

// export const APIHost ='http://47.92.145.141:2801';
// export const APIHost ='http://10.10.10.103:1235';
// export const APIHost ='http://10.10.10.101:8011';
// export const APIHost ='http://192.168.2.104:8014';  //本机
export const api='http://www.qj1588.cn:'
export const APIHost ='http://ht.qj1588.cn:80';  //测试服务器
var defaultParams = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};
/**
 * HTTP GET
 * @param  {string} url
 * @return {Promise}
 */
export function read(url) {
  return fetch(url, {
    ...defaultParams,
    method: 'get'
  });
}
/**
 * HTTP POST
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function create(url, body = {}) {
  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body: JSON.stringify(body)
  });
}
/**
 * HTTP PUT
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function update(url, body = {}) {

  return fetch(url, {
    ...defaultParams,
    method: 'put',
    body: JSON.stringify(body)
  });
}
/**
 * HTTP DELETE
 * @param  {string} url
 * @return {Promise}
 */
export function destroy(url) {
  return fetch(url, {
    ...defaultParams,
    method: 'delete'
  });
}

/************************************* token **********************************/
/**
 * HTTP GET
 * @param  {string} url
 * @param  {string} token
 * @return {Promise}
 */
export function read_Token(url,token) {
  defaultParams.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'authToken':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'get'
  });
}
// export function create_Token(url,token,body={}) {
//   defaultParams.headers = {
//       'Authorization':token
//   };
//   return fetch(url, {
//     ...defaultParams,
//     method: 'post',
//     body: body
//   });
// }
export function creat_Token(url,token,body={}) {
  // defaultParams.headers.authToken = token;
  defaultParams.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'authToken':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body: JSON.stringify(body)
  });
}

export function delete_Token(url,token) {
  defaultParams.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'authToken':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'delete'
  });
}

export function update_Token(url,token,body={}) {
  defaultParams.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'authToken':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'put',
    body: body
  });
}


export function uploadImg_Token(url,body) {
  return fetch(url, {
    method: 'post',
    body: body,
  });
}


export function getAuth(url,username,password){
  // console.log(url,username,password);
  
  if(!password&&!store.get("user")){return null}
  var iv = CryptoJs.enc.Latin1.parse('O2%=!ExPCuY6SKX(');
  // console.log(CryptoJs);
  var key = CryptoJs.enc.Latin1.parse(password ? CryptoJs.HmacMD5(password+"",password+"").toString() : store.get("user").password);
  var pass = AES.encrypt(url+":"+new Date().getTime(),key,{iv:iv,mode:CryptoJs.mode.CBC,padding:CryptoJs.pad.ZeroPadding}).toString();
  return (username? username : store.get("user").username)+":"+pass;
}
//登录
export function login(username,password){
  store.set("user",{username:username,password:HmacMD5(password,password).toString()});
  // console.log("登录成功")
}
//登出
export function loginOut(){
  store.remove("user");
  // console.log("登出成功")
}
//存ID
export function setId(id){
  store.set("id",{id:id});
}



export function loggedIn() {
  var user = store.get("user");
  if(!!user){
    return user
  }else{
    return false;
  }
}





