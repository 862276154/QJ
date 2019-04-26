import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast } from 'antd-mobile';
import '../public/css/App.css'
import right from '../public/img/left0.png'
import * as fetchs from '../utils/fetch'
import * as user from '../utils/user'
var store = require('store');
const AgreeItem = Checkbox.AgreeItem;
class binding extends Component {
  state = {
    codeimg: "",
    conYzm: "",
    Checkbox: false,
    bind: "",
    disb:false
  }
  componentDidMount() {
    user.xxck().then(data => {
      // console.log(data)
      if (data.code == 1 && data.data) {
     
        if(data.data.sfxx){
          this.setState({
            imgUrl: fetchs.APIHost + data.data.sfxx.sfz_pic,
            imgUrl1: fetchs.APIHost + data.data.sfxx.sfz_pic2,
          })

     
        }
        if(data.data.zhxx){
          this.refs.alipay.value = data.data.zhxx.alipay
          this.refs.wechat.value = data.data.zhxx.wechat
          this.refs.bank_num.value = data.data.zhxx.bank_num
          this.refs.bank_name.value = data.data.zhxx.bank_name
          this.refs.us_tel.value = data.data.zhxx.us_tel
          this.refs.bank_addr.value=data.data.zhxx.bank_addr
  
        }
       
     

      }
      if (data.data.zhxx.alipay||data.data.zhxx.alipay||data.data.zhxx.alipay) {
        this.setState({
          disb:true
        })
      }

    })
  }
  res() {
    const { bind } = this.state
    const { history } = this.props
    var body = {
      alipay: this.refs.alipay.value,
      wechat: this.refs.wechat.value,
      bank_num: this.refs.bank_num.value,
      bank_name: this.refs.bank_name.value,
      us_tel: this.refs.us_tel.value,
      bank_addr:this.refs.bank_addr.value
      // id:bind.id
    }
    if (bind) {
      var body = {
        alipay: this.refs.alipay.value,
        wechat: this.refs.wechat.value,
        bank_num: this.refs.bank_num.value,
        bank_name: this.refs.bank_name.value,
        us_tel: this.refs.us_tel.value,
        bank_addr:this.refs.bank_addr.value,
        id: bind.id
      }
      user.bind(body).then(data => {
        if (data.code == 1) {
          Toast.info(data.msg)
          // history.push("/")
        } else {
          Toast.info(data.msg)
        }
      })
    } else {
      user.binds(body).then(data => {
        if (data.code == 1) {
          Toast.info(data.msg)
          // history.push("/")
        } else {
          Toast.info(data.msg)
        }
      })
    }
  }
  render() {
    const { history } = this.props;
    const { disb } = this.state;
    // console.log(disb,1111)

    return (
      <div className="res">
        <style>
          {`
         .am-checkbox-agree{
          left: 26%;
         }
         .am-checkbox-agree .am-checkbox{
          left: -.1rem;
          top: .13rem;
         }
         .am-checkbox-inner{
          border-radius: 1px;
         }
         .checkbox .am-checkbox-input, .am-checkbox-inner{
          width: 0.2rem;
          height: 0.2rem;
          border: 1px solid #3b8dbb;
         }
        .am-checkbox.am-checkbox-checked .am-checkbox-inner{
          border-color: #5d0a0e;
          background: #920d14;
        }
         `}
        </style>
        <div className="res-hader">
          <img src={right} onClick={() => history.go(-1)} />
          绑定信息
          </div>
        <div className="user-res-input">
          <div className="user-content">
            <div className="form"><font>*</font><span>支&nbsp;&nbsp;付&nbsp;&nbsp;宝:</span> <input ref="alipay" disabled={disb} placeholder="支付宝" /> </div>
            <div className="form"><font>*</font><span>微信:</span>  <input placeholder="微信" disabled={disb} ref="wechat" /> </div>
            <div className="form"><font>*</font><span>银行卡:</span> <input placeholder="银行卡" disabled={disb} ref="bank_num" /> </div>
            <div className="form"><font>*</font><span>持卡人</span> <input placeholder="持卡人" disabled={disb} ref="bank_name" /> </div>
            <div className="form"><font>*</font><span>开户行</span> <input placeholder="开户行" disabled={disb} ref="bank_addr"  /> </div>
            <div className="form"><font>*</font><span>手机号:</span> <input placeholder="手机号" disabled={disb} ref="us_tel" /> </div>
            {/* <div className="form"><font>*</font><span>重复密m 0"}} ><span><input  placeholder="请输入短信验证码" /></span> <span className="">发送短信验证码</span></div> */}
            <div className="user-res-btn" style={{ textAlign: "center", marginTop: ".6rem" }}>
              <button onClick={this.res.bind(this)} disabled={disb}> 确定</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default binding;
