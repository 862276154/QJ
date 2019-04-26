import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import '../public/css/App.css'
import * as user from '../utils/user'
import right from '../public/img/whrtiht-left.png'
// const AgreeItem = Checkbox.AgreeItem;
class Change_mobel extends Component {
  state = {
    codeimg: "",
    conYzm: "",
    Checkbox: false,
    text_code: '获取',
    text_code1:"获取"
  }
  forget() {
    const { history } = this.props
    var mobile = this.refs.mobile.value
    var code = this.refs.code.value, us_pwd = this.refs.us_pwd.value, us_pwds = this.refs.us_pwds.value,code1=this.refs.code1.value
    const body = {
      code,
      tel:mobile,
      us_tel:us_pwd,
      code1
    }
    // if (!mobile) { return Toast.info("请输入手机号", 1) }
    if (!code) { return Toast.info("请输入验证码", 1) }
    if (!us_pwd) { return Toast.info("请输入手机号", 1) }
    if(us_pwd.length<11){
      Toast.info("手机号长度不足！", 1)
      return
    }
    if (us_pwd.length < 6) {
      return Toast.info("登录密码长度不足", 1)
    }
    if (!us_pwds) { return Toast.info("请再次确认手机号", 1) }
    if(us_pwds.length<11){
      Toast.info("手机号长度不足！", 1)
      return
    }
    if (us_pwd != us_pwds) { return Toast.info("两次手机号不一致！", 1) }
    Toast.info("正在修改请稍等...", 2)
    user.editPhone(body).then(data => {
      if(data.code==1){
        Toast.info(data.msg, 2)
        history.push("/")
      }else{
        Toast.info(data.msg, 1)
      }
   
    })

  }
  forgetCode() {
    var mobile = this.refs.mobile.value
    var data = {
      mobile
    }
    if (!mobile) {
      Toast.info("请输入手机号", 1)
      return
    }
    if(mobile.length<11){
      Toast.info("手机号长度不足！", 1)
      return
    }
    user.forgetCode(data).then(data => {
      if (data.code == 1) {
        Toast.info(data.msg, 2)
        return this.set_sms()

      } else {
        return Toast.info(data.msg, 2)
      }
    }

    )
  }
  forgetCode1() {
    var mobile = this.refs.us_pwd.value
    var data = {
      mobile
    }
    if (!mobile) {
      Toast.info("请输入新手机号", 1)
      return
    }
    if(mobile.length<11){
      Toast.info("手机号长度不足！", 1)
      return
    }
  
    user.sms(data).then(data => {
      if (data.code == 1) {
        Toast.info(data.msg, 2)
        return this.set_sms1()

      } else {
        return Toast.info(data.msg, 2)
      }

    })

    
  }
  set_sms() {
    // console.log("11231321321")
    const _this = this;
    let num = 120;
    let Countdown = setInterval(function () {
      num = num - 1;
      if (num >= 0) {
        _this.setState({
          text_code: num,
          disabled: true,
        });
        return;
      }
      _this.setState({
        text_code: '获取',
        disabled: false,
      });
      clearInterval(Countdown);
    }, 1000)
  }
  set_sms1() {
    // console.log("11231321321")
    const _this = this;
    let num = 120;
    let Countdown = setInterval(function () {
      num = num - 1;
      if (num >= 0) {
        _this.setState({
          text_code1: num,
          disabled1: true,
        });
        return;
      }
      _this.setState({
        text_code1: '获取',
        disabled: false,
      });
      clearInterval(Countdown);
    }, 1000)
  }
  render() {
    const { history } = this.props
    const { text_code,text_code1 } = this.state
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
        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff" }}>
          <img src={right} onClick={() => history.go(-1)} />
          修改手机号
          </div>
        <div className="user-res-input">
          <div className="user-content">
          <div className="form"><span>旧手机号</span> <input ref="mobile" placeholder="旧手机号" /> </div>
            <div className="form" style={{ position: "relative" }}><span>验证码</span>
              <input ref="code" placeholder="验证码" /> <button onClick={this.forgetCode.bind(this)} className="yzm" disabled={this.state.disabled} >{text_code}</button>
            </div>

            <div className="form"><span>设置手机号</span>  <input ref="us_pwd" placeholder="设置手机号" /> </div>
            <div className="form" style={{ position: "relative" }}><span>验证码</span>
              <input ref="code1" placeholder="验证码" /> <button onClick={this.forgetCode1.bind(this)} className="yzm" disabled={this.state.disabled1} >{text_code1}</button>
            </div>
            <div className="form"><span>确认手机号</span> <input ref="us_pwds" placeholder="请再次确认手机号" /> </div>
            <div className="user-res-btn" style={{ textAlign: "center", marginTop: "1rem" }}>
              <button style={{ borderRadius: ".3rem", height: ".7rem" }} onClick={this.forget.bind(this)}> 保存设置</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Change_mobel;
