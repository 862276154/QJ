import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import '../public/css/App.css'
import * as user from '../utils/user'
import right from '../public/img/whrtiht-left.png'
// const AgreeItem = Checkbox.AgreeItem;
class Forget_pwd extends Component {
  state = {
    codeimg: "",
    conYzm: "",
    Checkbox: false,
    text_code: '获取',
  }
  forget() {
    const { history } = this.props
    var mobile = this.refs.mobile.value
    var code = this.refs.code.value, us_pwd = this.refs.us_pwd.value, us_pwds = this.refs.us_pwds.value
    const body = {
      code,
      us_pwd,
      us_tel:mobile
    }
    if (!mobile) { return Toast.info("请输入手机号", 1) }
    if (!code) { return Toast.info("请输入验证码", 1) }
    if (!us_pwd) { return Toast.info("请输入密码", 1) }
    if (us_pwd.length < 6) {
      return Toast.info("登录密码长度不足", 1)
    }
    if (!us_pwds) { return Toast.info("请再次确认密码", 1) }
    if (us_pwd != us_pwds) { return Toast.info("两次密码不一致！", 1) }
    Toast.info("正在修改请稍等...", 2)
    user.forget(body).then(data => {
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
  render() {
    const { history } = this.props
    const { text_code } = this.state
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
          忘记密码
          </div>
        <div className="user-res-input">
          <div className="user-content">
            <div className="form"><span>手机号</span> <input ref="mobile" placeholder="手机号" /> </div>
            <div className="form" style={{ position: "relative" }}><span>验证码</span>
              <input ref="code" placeholder="验证码" /> <button onClick={this.forgetCode.bind(this)} className="yzm" disabled={this.state.disabled} >{text_code}</button>
            </div>
            <div className="form"><span>设置登录密码</span>  <input ref="us_pwd" placeholder="6-18位字符" /> </div>
            <div className="form"><span>确认登录密码:</span> <input ref="us_pwds" placeholder="请再次输入密码" /> </div>
            <div className="user-res-btn" style={{ textAlign: "center", marginTop: "1rem" }}>
              <button style={{ borderRadius: ".3rem", height: ".7rem" }} onClick={this.forget.bind(this)}> 保存设置</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Forget_pwd;
