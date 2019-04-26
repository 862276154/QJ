require('fetch-ie8');
var AES = require("crypto-js/aes");
var HmacMD5 = require("crypto-js/hmac-md5");
var store = require('store');
var { lang } = require('./lang');

export const APIHost ='https://www.tbwmf.com/server';
//  export const APIHost ='http://192.168.2.233:1044'; 
// export const APIHost ='http://47.92.145.141:8044';

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
    body: body
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

export function uploadImg_Token0(url) {
  return fetch(url, {
    method: 'post',
  });
}

export function getAuth(url,username,password){
  var CryptoJs = require("crypto-js");
  if(!password&&!store.get("user")){return null}

  var iv = CryptoJs.enc.Latin1.parse('O2%=!ExPCuY6SKX(');
  var key = CryptoJs.enc.Latin1.parse(password? HmacMD5(password,password).toString() : store.get("user").password);
  var pass = AES.encrypt(url+":"+new Date().getTime(),key,{iv:iv,mode:CryptoJs.mode.CBC,padding:CryptoJs.pad.ZeroPadding}).toString();
  return (username? username : store.get("user").username)+":"+pass;
}

//登录
export function login(username,password){
  store.set("user",{username:username,password:HmacMD5(password,password).toString()});
}
//登出
export function loginOut(){
  store.remove("user");
}

export function loggedIn() {
  var user = store.get("user");
  if(!!user){
    return user
  }else{
    return false;
  }
}

//获取国际化语言
export function getLang() {
  var langStore = store.get("lang");
  if(!!langStore){
    return lang[langStore];
  }else{
    return lang.zh_cn;
  }
}

//设置国际化语言
export function setLang(lang) {
  //console.log(lang);
  store.set("lang",lang);
}

//获取国际化语言表示
export function getLangStr(lang) {
  var langStore = store.get("lang");
  if(!!langStore){
    return langStore
  }else{
    return "zh_cn";
  }
}



