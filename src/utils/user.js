import * as fetchs from './fetch';
var store = require('store');

// 注册
export async function res(params) {
  // console.log("@@",params);
  return await fetchs.create(fetchs.APIHost + `/reg`, params).then(response => response.json())
    .then(json => {

      return json
    });
}
// 绑定信息  user/info
export async function bind(body) {
  var token1 = fetchs.getAuth("/bind")


  var data = await fetchs.create(fetchs.APIHost + "/bind", body);

  var json = data.json();
  return json
}
// 绑定信息  user/info
export async function binds(body) {
  var token1 = fetchs.getAuth("/user/info")
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.creat_Token(fetchs.APIHost + "/user/info", token, body);

  var json = data.json();
  return json
}

// 验证登录 
export async function web(params) {
  // console.log("%%$$$$$");
  return await fetchs.read(fetchs.APIHost + "/web").then(response => response.json())
    .then(json => {
      // console.log("######=====", json)
      return json
    });
  // var json = data.json();
  // return json;
}

//  获取 logo    
export async function logo(params) {
  // console.log("%%$$$$$");
  return await fetchs.read(fetchs.APIHost + "/logo").then(response => response.json())
    .then(json => {

      // console.log("######=====", json)
      return json
    });
  // var json = data.json();
  // return json;
}

// 登录
export async function login(params) {
  // console.log(params)
  var token1 = fetchs.getAuth("/login", params.us_tel, params.us_pwd);
  return await fetchs.creat_Token(fetchs.APIHost + "/login", token1, params).then(response => response.json())
    .then(json => {
      // console.log(json)
      return json
    });

}

export async function login2(params) {
  var token1 = fetchs.getAuth("/login2", params.us_tel, params.us_pwd);
  if (params) {
    return await fetchs.creat_Token(fetchs.APIHost + "/login2", token1, params).then(response => response.json())
      .then(json => {
        // console.log(json)
        return json
      });
  } else {
    var id = store.get("user_infos")
    // console.log(id)
    if (id) {
      var token = token1 + ":" + id.login
      return await fetchs.creat_Token(fetchs.APIHost + "/login2", token, params).then(response => response.json())
        .then(json => {
          // console.log(json)
          return json
        });
    }

  }
}

//   轮播图
export async function banner() {
  var token1 = fetchs.getAuth("/banner")
  // console.log(token1)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
    var data = await fetchs.read_Token(fetchs.APIHost + "/banner", token);

    var json = data.json();
    return json
  } else {
    var data = await fetchs.read_Token(fetchs.APIHost + "/banner", token1);

    var json = data.json();
    return json

  }



}
//product/title
//   轮播图
export async function product_title() {
  var token1 = fetchs.getAuth("/product/title")
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }
  var data = await fetchs.read_Token(fetchs.APIHost + "/product/title", token);
  var json = data.json();
  return json
}
// 藏酒轮播
export async function product_title1() {
  var token1 = fetchs.getAuth("/liquor/title")
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }
  var data = await fetchs.read_Token(fetchs.APIHost + "/liquor/title", token);
  var json = data.json();
  return json
}
// 活动轮播
export async function product_title3() {
  var token1 = fetchs.getAuth("/product/title3")
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }
  var data = await fetchs.read_Token(fetchs.APIHost + "/product/title3", token);
  var json = data.json();
  return json
}
// 合作轮播
export async function product_title4() {
  var token1 = fetchs.getAuth("/product/title4")
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }
  var data = await fetchs.read_Token(fetchs.APIHost + "/product/title4", token);
  var json = data.json();
  return json
}
// 滚动 公告  notice
export async function notice() {
  var token1 = fetchs.getAuth("/notice")
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + "/notice", token);

  var json = data.json();
  return json
}
// 公告  notice
export async function notices() {
  var token1 = fetchs.getAuth("/advertising")

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + "/advertising", token);

  var json = data.json();
  return json
}

// 自定义链接  notice
export async function CustomLink() {
  var token1 = fetchs.getAuth("/btn")
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + "/btn", token);

  var json = data.json();
  return json
}




// 忘记密码
export async function forget(params) {
  // console.log("@@",params);
  return await fetchs.create(fetchs.APIHost + `/forget`, params).then(response => response.json())
    .then(json => {

      return json
    });
}
//  sms  获取 验证码 
export async function sms(params) {
  // console.log("@@",params);
  return await fetchs.create(fetchs.APIHost + `/smsCode`, params).then(response => response.json())
    .then(json => {

      return json
    });
}
//   忘记密码 验证码
export async function forgetCode(params) {
  // console.log("@@",params);
  return await fetchs.create(fetchs.APIHost + `/forgetCode`, params).then(response => response.json())
    .then(json => {

      return json
    });
}

//  修改登录密码
export async function ditPwd(body) {

  var token1 = fetchs.getAuth("/editPwd")
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.creat_Token(fetchs.APIHost + "/editPwd", token, body);

  var json = data.json();
  return json
}
//  修改支付密码
export async function editPayPwd(body) {

  var token1 = fetchs.getAuth("/editPayPwd")
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.creat_Token(fetchs.APIHost + "/editPayPwd", token, body);

  var json = data.json();
  return json
}

//  修改手机号
export async function editPhone(params) {
  var token1 = fetchs.getAuth("/editPhone")

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.creat_Token(fetchs.APIHost + "/editPhone", token, params);

  var json = data.json();
  return json
}
// 获取轮播图 GET /postSwiper/{id}
export async function postSwiper(id) {
  return await fetchs.read(fetchs.APIHost + `/postSwiper/${id}`)
    .then(response => response.json())
    .then(json => {
      return json
    });

}

// 获取  签到信息

export async function Sign() {
  var token1 = fetchs.getAuth("/Sign")
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + "/Sign", token);

  var json = data.json();
  return json
}
// 签到
export async function Sign_post(body) {
  var token1 = fetchs.getAuth("/Sign")
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.creat_Token(fetchs.APIHost + "/Sign", token, body);

  var json = data.json();
  return json
}
//BuyBrew  酿酒坊 购买 列表 
export async function BuyBrew() {
  var token1 = fetchs.getAuth("/BuyBrew")
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + "/BuyBrew", token);
  var json = data.json();
  return json
}
//BuyBrew  酿酒坊列表
export async function BuyBrew_buy(params) {
  var token1 = fetchs.getAuth(`/Brewhouse/buy?id=${params.id}&pwd=${params.pwd}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/Brewhouse/buy?id=${params.id}&pwd=${params.pwd}`, token);
  var json = data.json();
  return json
}
// 我的酿酒坊 列表
export async function brew_list(params) {
  var token1 = fetchs.getAuth(`/brew/list?page=${params.page}&size=${params.size}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/brew/list?page=${params.page}&size=${params.size}`, token);
  var json = data.json();
  return json
}

// 开启酿酒坊

export async function brew_lists(params) {
  var token1 = fetchs.getAuth(`/brew/list?id=${params.id}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/brew/list?id=${params.id}`, token);
  var json = data.json();
  return json
}



//deal  
export async function deal(page, size, type, id) {
  var token1 = fetchs.getAuth(`/deal?page=${page}&size=${size}&type=${type}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + `/deal?page=${page}&size=${size}&type=${type}`, token);

  var json = data.json();
  return json
}
//   获取购买  或是 出让 信息
export async function deal_id(id) {
  var token1 = fetchs.getAuth(`/deal?id=${id}`)

  var ids = store.get("user_infos")
  if (ids) {
    var token = token1 + ":" + ids.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/deal?id=${id}`, token);

  var json = data.json();
  return json
}
//  购买  或是 出让 

export async function deal_buy(params) {
  var token1 = fetchs.getAuth(`/deal/buy`)

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.creat_Token(fetchs.APIHost + `/deal/buy`, token, params);

  var json = data.json();
  return json
}


export async function brew_sq(params) {
  var token1 = fetchs.getAuth(`/brew/qjlist2`)

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.creat_Token(fetchs.APIHost + `/brew/qjlist2`, token, params);

  var json = data.json();
  return json
}
//  我的 购买  或是 出让 

export async function deal_sell(params) {
  var token1 = fetchs.getAuth(`/deal/sell`)

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.creat_Token(fetchs.APIHost + `/deal/sell`, token, params);

  var json = data.json();
  return json
}
//deal/buyList  我的交易记录


export async function buyList(page) {
  var token1 = fetchs.getAuth(`/deal/buylist`)

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/deal/buylist`, token);

  var json = data.json();
  return json
}

// 锁仓

// 获取锁仓信息  lock/type

export async function lock(page) {
  var token1 = fetchs.getAuth(`/lock/type`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + `/lock/type`, token);

  var json = data.json();
  return json
}

//  提交锁仓 lock/position

export async function lock_positon(params) {
  var token1 = fetchs.getAuth(`/lock/position`)

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.creat_Token(fetchs.APIHost + `/lock/position`, token, params);

  var json = data.json();
  return json
}

// 开店  merchant  获取开店参数

export async function merchant() {
  var token1 = fetchs.getAuth(`/merchant/index`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + `/merchant/index`, token);

  var json = data.json();
  return json
}

// 提交 开店参数

export async function merchant_submit(params) {
  var token1 = fetchs.getAuth(`/merchant/merchant`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.creat_Token(fetchs.APIHost + `/merchant/merchant`, token, params);

  var json = data.json();
  return json
}
// 提交 身份信息验证

export async function merchant_submits(params) {
  var token1 = fetchs.getAuth(`/user/sfbd`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.creat_Token(fetchs.APIHost + `/user/sfbd`, token, params);

  var json = data.json();
  return json
}
//  获取商品分类  product/type
export async function getShopclass() {
  var token1 = fetchs.getAuth(`/product/type`)

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/product/type`, token);

  var json = data.json();
  return json
}

//  获取 绑定的信息
export async function xxck() {
  var token1 = fetchs.getAuth(`/xxck`)

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/xxck`, token);

  var json = data.json();
  return json
}



//  发布商品  product/upload
export async function product_upload(params) {
  var token1 = fetchs.getAuth(`/product/upload`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.creat_Token(fetchs.APIHost + `/product/upload`, token, params);

  var json = data.json();
  return json
}
//   提交反馈
export async function feedback(params) {
  var token1 = fetchs.getAuth(`/feedback`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }
  var data = await fetchs.creat_Token(fetchs.APIHost + `/feedback`, token, params);
  var json = data.json();
  return json
}
//   发布列表 
export async function product_list(page, size, status) {
  var token1 = fetchs.getAuth(`/product/list?page=${page}&size=${size}&status=${status}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/product/list?page=${page}&size=${size}&status=${status}`, token);

  var json = data.json();
  return json
}
//  下架 
export async function product_list_id(id) {
  var token1 = fetchs.getAuth(`/product/list?id=${id}`)
  var ids = store.get("user_infos")
  if (ids) {
    var token = token1 + ":" + ids.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/product/list?id=${id}`, token);

  var json = data.json();
  return json
}


//  获取商品 分类列表  // shop/index  
export async function getShopClass(page, size, type, id) {
  // console.log("获取商品 分类列表 ",type)
  var token1 = fetchs.getAuth(`/shop/index?page=${page}&size=${size}&type=${type}&cate_id=${id}`)
  var ids = store.get("user_infos")
  if (ids) {
    var token = token1 + ":" + ids.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + `/shop/index?page=${page}&size=${size}&type=${type}&cate_id=${id}`, token);

  var json = data.json();
  return json
}

//  获取 新闻 分类  // shop/index  
export async function zx_cate() {
  var token1 = fetchs.getAuth(`/zx/cate`)
  var ids = store.get("user_infos")
  if (ids) {
    var token = token1 + ":" + ids.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + `/zx/cate`, token);

  var json = data.json();
  return json
}

//  获取 新闻 分类 列表  // shop/index  
export async function zx_list(id) {
  var token1 = fetchs.getAuth(`/zx/list?id=${id}`)
  var ids = store.get("user_infos")
  if (ids) {
    var token = token1 + ":" + ids.login
  }
  var data = await fetchs.read_Token(fetchs.APIHost + `/zx/list?id=${id}`, token);
  var json = data.json();
  return json
}
//  获取 新闻 详情 
export async function zx_lists(id) {
  var token1 = fetchs.getAuth(`/zx/list?zx_id=${id}`)
  var ids = store.get("user_infos")
  if (ids) {
    var token = token1 + ":" + ids.login
  }
  var data = await fetchs.read_Token(fetchs.APIHost + `/zx/list?zx_id=${id}`, token);
  var json = data.json();
  return json
}
//  获取 藏酒 商品分类  // shop/index  
export async function liquor(page, size, type, id) {
  var token1 = fetchs.getAuth(`/liquor/list?page=${page}&size=${size}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + `/liquor/list?page=${page}&size=${size}`, token);

  var json = data.json();
  return json
}
//  获取 藏酒 详情  // shop/index  
export async function liquors(id) {
  var token1 = fetchs.getAuth(`/liquor/list?id=${id}`)
  var ids = store.get("user_infos")
  if (ids) {
    var token = token1 + ":" + ids.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + `/liquor/list?id=${id}`, token);

  var json = data.json();
  return json
}

//  获取 搜素
export async function liquors_keywords(id) {
  // console.log(id)
  var token1 = fetchs.getAuth(`/shop/index`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.creat_Token(fetchs.APIHost + `/shop/index`, token, { "keywords": id });
  var json = data.json();
  return json
}
//  获取商品 详情   // shop/index  
export async function getShop(id) {
  var token1 = fetchs.getAuth(`/shop/index?id=${id}`)
  var ids = store.get("user_infos")
  if (ids) {
    var token = token1 + ":" + ids.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/shop/index?id=${id}`, token);
  var json = data.json();
  return json
}
//  获取  我的商品 发货数量   // shop/index  
export async function sendGoodNum(id) {
  var token1 = fetchs.getAuth(`/product/sendGoodNum`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/product/sendGoodNum`, token);
  var json = data.json();
  return json
}
//  product/rate 
export async function rate(id) {
  var token1 = fetchs.getAuth(`/product/rate`)

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/product/rate`, token);

  var json = data.json();
  return json
}
// buyback/rate    提现手续费

export async function rates(id) {
  var token1 = fetchs.getAuth(`/buyback/rate`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + `/buyback/rate`, token);

  var json = data.json();
  return json
}
//
// 购买商品
export async function buyshop(params) {
  var token1 = fetchs.getAuth(`/product/buy`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.creat_Token(fetchs.APIHost + `/product/buy`, token, params);

  var json = data.json();
  return json
}
// 购买 藏酒 商品
export async function liquor_buy(params) {
  var token1 = fetchs.getAuth(`/liquor/buy`)

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.creat_Token(fetchs.APIHost + `/liquor/buy`, token, params);

  var json = data.json();
  return json
}
// 购买 藏酒 商品  出让
export async function liquor_sell(params) {
  var token1 = fetchs.getAuth(`/liquor/sell`)

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.creat_Token(fetchs.APIHost + `/liquor/sell`, token, params);

  var json = data.json();
  return json
}
// 购买 藏酒 商品  提货
export async function liquor_tGood(params) {
  var token1 = fetchs.getAuth(`/liquor/tGood`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.creat_Token(fetchs.APIHost + `/liquor/tGood`, token, params);
  var json = data.json();
  return json
}

// 发货
export async function sendGood(params) {
  var token1 = fetchs.getAuth(`/product/sendGood`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.creat_Token(fetchs.APIHost + `/product/sendGood`, token, params);
  var json = data.json();
  return json
}
//   商品 购买列表 buy/list
export async function shop_buy_list(page, size, status) {
  var token1 = fetchs.getAuth(`/buy/list?page=${page}&size=${size}&status=${status}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/buy/list?page=${page}&size=${size}&status=${status}`, token);

  var json = data.json();
  return json
}
// 账户明细
export async function log(page, size, status) {
  var token1 = fetchs.getAuth(`/log?status=${status}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/log?status=${status}`, token);

  var json = data.json();
  return json
}

//   藏酒 商品 购买列表 buy/list
export async function liquor_my(page, size, status) {
  var token1 = fetchs.getAuth(`/liquor/my?page=${page}&size=${size}&status=${status}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/liquor/my?page=${page}&size=${size}&status=${status}`, token);

  var json = data.json();
  return json
}

//  我的出售列表
export async function dGood(page, size, status) {
  var token1 = fetchs.getAuth(`/dGood?page=${page}&size=${size}&status=${status}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/dGood?page=${page}&size=${size}&status=${status}`, token);

  var json = data.json();
  return json
}

//  确认收货 
export async function confirm_id(id) {
  var token1 = fetchs.getAuth(`/buy/list?id=${id}`)
  var ids = store.get("user_infos")
  if (ids) {
    var token = token1 + ":" + ids.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/buy/list?id=${id}`, token);

  var json = data.json();
  return json
}
//  确认 下架
export async function confirm_xj(id) {
  var token1 = fetchs.getAuth(`/product/list?id=${id}`)
  var ids = store.get("user_infos")
  if (ids) {
    var token = token1 + ":" + ids.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/product/list?id=${id}`, token);

  var json = data.json();
  return json
}
//  确认收货 
export async function confirm_ids(id) {
  var token1 = fetchs.getAuth(`/liquor/res?id=${id}`)
  var ids = store.get("user_infos")
  if (ids) {
    var token = token1 + ":" + ids.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/liquor/res?id=${id}`, token);

  var json = data.json();
  return json
}


// 获取 QJ 生产列表
export async function qjlist(id) {
  var token1 = fetchs.getAuth(`/brew/qjlist`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/brew/qjlist`, token);

  var json = data.json();
  return json
}
// 获取 酿力和QJ
export async function hqqj(id) {
  var token1 = fetchs.getAuth(`/hqqj`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/hqqj`, token);

  var json = data.json();
  return json
}
// 收取 QJ 生产列表 QJ
export async function qjlists(params) {
  var token1 = fetchs.getAuth(`/brew/qjlist`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.creat_Token(fetchs.APIHost + `/brew/qjlist`, token, params);

  var json = data.json();
  return json
}


//  分类 
export async function cate_id(id) {
  var token1 = fetchs.getAuth(`/shop/all?cate_id=${id} `)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/shop/all?cate_id=${id} `, token);

  var json = data.json();
  return json
}
//  分类 
export async function rsname(params) {
  // console.log(params)
  // return
  var token1 = fetchs.getAuth(`/rsname?id=${params}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/rsname?id=${params}`, token);

  var json = data.json();
  return json
}

// 修改用户地址
// 购买商品
export async function updata_user_info(params) {
  var token1 = fetchs.getAuth(`/edit/addr`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.creat_Token(fetchs.APIHost + `/edit/addr`, token, params);

  var json = data.json();
  return json
}

// 充值  


export async function recharge(page) {
  var token1 = fetchs.getAuth(`/recharge`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + `/recharge`, token);

  var json = data.json();
  return json
}
// 充值 提现 


export async function recharges(params) {
  var token1 = fetchs.getAuth(`/recharge`)

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.creat_Token(fetchs.APIHost + `/recharge`, token, params);

  var json = data.json();
  return json
}
// buyback
// 充值 提现 
export async function buyback(params) {
  var token1 = fetchs.getAuth(`/buyback`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.creat_Token(fetchs.APIHost + `/buyback`, token, params);

  var json = data.json();
  return json
}

// 添加地址
export async function addr(params) {
  var token1 = fetchs.getAuth(`/addr`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }
  var data = await fetchs.creat_Token(fetchs.APIHost + `/addr`, token, params);
  var json = data.json();
  return json
}
// 获取 地址
export async function addr_get(params) {
  var token1 = fetchs.getAuth(`/addr`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }
  var data = await fetchs.read_Token(fetchs.APIHost + `/addr`, token);
  var json = data.json();
  return json
}
// addr/del  删除地址
export async function addr_get_dl(params) {
  var token1 = fetchs.getAuth(`/addr/del?id=${params}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }
  var data = await fetchs.read_Token(fetchs.APIHost + `/addr/del?id=${params}`, token);
  var json = data.json();
  return json
}
//  设为默认
export async function addr_get_df(params) {
  var token1 = fetchs.getAuth(`/addr/def?id=${params}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }
  var data = await fetchs.read_Token(fetchs.APIHost + `/addr/def?id=${params}`, token);
  var json = data.json();
  return json
}


//deal/buyList  我的交易记录


export async function recharge_list(page) {
  var token1 = fetchs.getAuth(`/recharge/buylist`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + `/recharge/buylist`, token);

  var json = data.json();
  return json
}
//lock/lockList
export async function recharge_lists(page) {
  var token1 = fetchs.getAuth(`/lock/lockList`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }


  var data = await fetchs.read_Token(fetchs.APIHost + `/lock/lockList`, token);

  var json = data.json();
  return json
}



export async function buyback_list() {
  var token1 = fetchs.getAuth(`/buyback`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/buyback`, token);
  var json = data.json();
  return json
}
// 确认订单
export async function confirm(e) {
  var token1 = fetchs.getAuth(`/confirm?id=${e}`)
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/confirm?id=${e}`, token);
  var json = data.json();
  return json
}

// 获取文档

//   获取购买  或是 出让 信息
export async function doc(id) {
  var token1 = fetchs.getAuth(`/doc`)

  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  var data = await fetchs.read_Token(fetchs.APIHost + `/doc`, token);

  var json = data.json();
  return json
}

// 上传图片

export async function uploadImageAct(params) {
  const url = fetchs.APIHost + '/file';
  return fetchs.uploadImg_Token(url, params).then(response => response.json()).then(json => { return json })
}


// 登录
export async function logins(params) {
  // console.log(params)

  if (params) {
    params.us_tel
  }
  // ;
  var token1 = fetchs.getAuth("/login", params.us_tel, params.us_pwd);
  var id = store.get("user_infos")
  if (id) {
    var token = token1 + ":" + id.login
  }

  // console.log(token)

  return await fetchs.creat_Token(fetchs.APIHost + "/login", token, params).then(response => response.json())
    .then(json => {
      // console.log(json)
      return json
    });

}