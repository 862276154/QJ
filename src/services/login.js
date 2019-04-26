

import * as fetchs from '../utils/fetch';



// 添加商品
export function getAddr(params){
  return fetchs.creat_Token(fetchs.APIHost+"/addr/list",fetchs.getAuth("/addr/list"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}

// 添加商品
export function addGood(params){
  return fetchs.creat_Token(fetchs.APIHost+"/shop/add",fetchs.getAuth("/shop/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 获取分类列表
export function getClassify(){
  return fetchs.read_Token(fetchs.APIHost+"/shop/type",fetchs.getAuth("/shop/type")).then(response => response.json())
  .then(json => { return json});
}

// 获取我的商品列表
export function getGoods(params){
  if(!params.page){
    params={page:1}
  }
  return fetchs.read_Token(fetchs.APIHost+"/good/list?page="+params.page,fetchs.getAuth("/good/list")).then(response => response.json())
  .then(json => { return json});
}



// 删除商品
export function deteteGood(params){
  return fetchs.creat_Token(fetchs.APIHost+"/good/delete",fetchs.getAuth("/good/delete"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}


// 获取轮播列表
export function getCarousel(){
  return fetchs.read_Token(fetchs.APIHost+"/shop/roll",fetchs.getAuth("/shop/roll")).then(response => response.json())
  .then(json => { return json});
}

// 获取商城商品列表
export function getShopList(params){
  if(!params.page){
    params.page=1
  }
  if(params.search){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?page="+params.page+"&search="+params.search,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }else if(params.type){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?page="+params.page+"&type="+params.type,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }else if(params.is_hot){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?page="+params.page+"&is_hot="+params.is_hot,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }else if(params.id){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?id="+params.id,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }
}





// 结算
export function createOrder(params){
  return fetchs.creat_Token(fetchs.APIHost+"/good/buy",fetchs.getAuth("/good/buy"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}


// 商城交易记录
export function getOrder(params){
  if(!params.page){
    params.page=1
  }
  if(!params.type){
    params.type=0
  }
  if(params.id){
    return fetchs.read_Token(fetchs.APIHost+"/shop/Record?id="+params.id+"&type="+params.type,fetchs.getAuth("/shop/Record")).then(response => response.json())
    .then(json => { return json});
  }else{
    return fetchs.read_Token(fetchs.APIHost+"/shop/Record?page="+params.page+'&type='+params.type,fetchs.getAuth("/shop/Record")).then(response => response.json())
    .then(json => { return json});
  }
}



// 确认完成订单
export function endOrder(params){
  return fetchs.creat_Token(fetchs.APIHost+"/good/suc",fetchs.getAuth("/good/suc"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
