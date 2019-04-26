import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast } from 'antd-mobile';
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch';
import '../public/css/App.css';
import '../public/css/buy.css';
import right from '../public/img/whrtiht-left.png';
import userimg from '../public/img/userimg.png';
import app_jia from '../public/img/app_jia.png';
import rights from '../public/img/rights.png' 
var store = require('store');
var queryString = require('querystring');

class user_info extends Component {
  state = {
    title: 0,
    data: "",
    user_info: "",
    imgis:0
  }
  async componentDidMount() {
    // fetchs.login()
    var { location } = this.props
    const { history } = this.props


    var user_logo = store.get("user")
    if (user_logo) {
      var body = {
        us_tel: user_logo.us_tel,
        us_pwd: user_logo.us_pwd
      }
      user.login({ body }).then(data => {
        if (data.code == 4) {
          Toast.info(data.msg, 1)
          store.remove("user_infos")
           history.push("/")
        }
        // console.log(data.data)
        var user_info = data.data
        if (data.code == 1) {
          store.set("user_info", user_info)
        }
        if (user_info) {
          this.setState({
            user_info: user_info,
            imgUrl: user_info.us_avatar
          })
          // 更新默认参数
          user_info.addr_name ? this.refs.addr_name.value = user_info.addr_name : ""//收货人
          user_info.bank_name ? this.refs.bank_name.value = user_info.bank_name : ""//
          user_info.bank_num ? this.refs.bank_num.value = user_info.bank_num : ""
          user_info.us_name ? this.refs.us_name.value = user_info.us_name : ""
          user_info.us_tel ? this.refs.us_tel.value = user_info.us_tel : ""
          user_info.wechat ? this.refs.wechat.value = user_info.wechat : ""
          user_info.alipay ? this.refs.alipay.value = user_info.alipay : ""
          user_info.sfz ? this.refs.sfz.value = user_info.sfz : ""
          user_info.addr ? this.refs.addr.value = user_info.addr : ""
          
        }
      })
    }
  }
  // 修改资料
  async  deal_buy() {
    const { history } = this.props
    var body = {
      addr_name: this.refs.addr_name.value,
      bank_name: this.refs.bank_name.value,
      bank_num: this.refs.bank_num.value,
      wechat: this.refs.wechat.value,
      alipay: this.refs.alipay.value,
      // sfz: this.refs.sfz.value,
      us_avatar: this.state.imgUrl,
      addr: this.refs.addr.value

    }
    Toast.info("修改中...")
    user.updata_user_info(body).then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
         history.push("/")
      }
      // console.log(data)
      if (data.code == 1) {
        Toast.info(data.msg)
      }

      // Toast.info(data)
      Toast.info(data.msg)
    })


  }
  getLocalImg(e) {
    if (!e.target.files[0]) {
      return
    }
    var reader = new FileReader();
    // var url;
    reader.readAsDataURL(e.target.files[0])
    reader.onload = function (e) {
      this.setState({
        imgUrl: e.target.result,
        imgis:1

      })
      return this.result
    }.bind(this)
  }
  render() {
    const { history } = this.props
    const { title, data ,imgis} = this.state
    // console.log(data)
    return (
      <div className="res user_info ">
        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff", position: "relative" }}>
          <img src={right} onClick={() => history.go(-1)} />
          修改个人资料
        </div>
        <div className=" buy border " >
          <div className=" buy-content border">
            <span>头像</span>
            <div className=" img from-input">
              <label className="fengmianDiv">
                <input id="imgURl" style={{ display: "none" }} name="from" ref="files" type="file" onChange={(e) => this.getLocalImg(e)} accept="image/jpeg,image/x-png,image/gif" />
                <img style={{ borderRadius: "50%",overflow:"hidden" }} className="id_card" ref="cover" name="enter_imgsPath" 
                src={this.state.imgUrl ? imgis==0? fetchs.APIHost+ this.state.imgUrl: this.state.imgUrl : userimg} />
              </label>
            </div>
          </div>
       <div style={{display:"none"}}>
          <div className="buy-content border">
            <span > 姓名</span>
            <div className="from-input">
              <input ref="us_name" type="text" disabled={true} placeholder="姓名" />
            </div>
          </div>
          <div className="buy-content border">
            <span > 手机号</span>
            <div className="from-input">
              <input ref="us_tel" type="number" disabled={true} placeholder="手机号" />
            </div>
          </div>
          <div className="buy-content border">
            <span > 身份证号</span>
            <div className="from-input">
              <input ref="sfz" type="number" disabled={true} placeholder="身份证号" />
            </div>
          </div>
          {/* <div className="buy-content border">
            <span > 银行</span>
            <div className="from-input">
              <input ref="number" type="number" placeholder="银行" />
            </div>
          </div> */}
          <div className="buy-content border">
            <span > 银行卡号</span>
            <div className="from-input">
              <input ref="bank_num" type="number"  placeholder="银行卡号" />
            </div>
          </div>
          <div className="buy-content border">
            <span >持卡人姓名</span>
            <div className="from-input">
              <input ref="bank_name" type="text" placeholder="持卡人姓名" />
            </div>
          </div>
          <div className="buy-content border">
            <span > 微信</span>
            <div className="from-input">
              <input ref="wechat" type="text" placeholder="微信" />
            </div>
          </div>
          <div className="buy-content border">
            <span > 支付宝</span>
            <div className="from-input">
              <input ref="alipay" type="text" placeholder="支付宝" />
            </div>
          </div>
          <div className="buy-content border">
            <span > 详细地址</span>
            <div className="from-input">
              <input ref="addr" type="text" placeholder="详细地址" />
            </div>
          </div>
          <div className="buy-content border">
            <span > 收货人</span>
            <div className="from-input">
              <input ref="addr_name" type="text" placeholder="收货人" />
            </div>
          </div></div>
          <div className="buy-content border" onClick={()=>history.push("/address_gl")}>
            <span > 地址管理</span>
            <div className="from-input">
               <img style={{width:".2rem",height:"100%"}} src={rights} alt=""/>
            </div>
          </div>
        </div>
        <div className="confirm"  ><button onClick={this.deal_buy.bind(this, data.id)}>确认</button></div>
      </div>
    );
  }
}

export default user_info;
