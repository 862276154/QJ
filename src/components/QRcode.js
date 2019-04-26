import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import '../public/css/App.css'
import * as user from '../utils/user'
// import right from '../public/img/whrtiht-left.png'
import right from '../public/img/left.png'
import copy from 'copy-to-clipboard';
import  {api}from '../utils/fetch';
var QRCode = require('qrcode.react');
var store = require('store');
class QRcode extends Component {
  state = {
    user: {
      myNumber: 1
    },
    us_tel: ""
  }
  componentDidMount() {
    var user_info = store.get("user_info")
    console.log(user_info.us_tel)
    if (user_info) {
      this.setState({
        us_tel: user_info.us_tel
      })
    }
  }
  forget() {
    const { history } = this.props
    var mobile = this.refs.mobile.value
    var code = this.refs.code.value, us_pwd = this.refs.us_pwd.value, us_pwds = this.refs.us_pwds.value
    const body = {
      code,
      us_pwd,
      us_tel: mobile
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
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      if (data.code == 1) {
        Toast.info(data.msg, 2)
        history.push("/")
      } else {
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
  copyCode = (tgUrl) => {
    copy(tgUrl);
    Toast.success("复制成功!如未成功请手动复制!", 2);
  }
  to(e){
    console.log(e)
  }
  render() {
    const { history } = this.props
    console.log(api)
    const { text_code, us_tel } = this.state
    const to_reg =api+ "/res?p_tel=" + us_tel;
    const tgUrl = api+"/res?p_tel=" + us_tel;
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
        <div className="res-hader" style={{ backgroundColor: "#fff", color: "#000" }}>
          <img src={right} onClick={() => history.go(-1)} />
          我的二维码
          </div>
        <div className="user-res-input QRcode">
          <div className="user-content">
            <ul className="erweima">
              <div className='inner' style={{ textAlign: "center", border: ".2rem solid #fff" }}>
                {/* <h2 style={{ fontSize: ".6rem", marginBottom: ".4rem" }}>扫码注册</h2> */}
                {/* <Link to={to_reg}> */}
                
                {/* </Link> */}
                <QRCode onClick={()=>this.to(to_reg)} style={{ width: "100%", height: "100%" }} className="code_img" value={tgUrl} />
                {/* <p style={{ fontSize: ".12rem", marginBottom: ".3rem" }}>  {tgUrl} </p> */}
                {/* <button className="er_btn" style={{ fontSize: ".5rem" }} onClick={() => this.copyCode(tgUrl)} className="er_btn"> 点击复制</button> */}


                {/*<img src={user.userInfo._id?'http://qr.liantu.com/api.php?text=http://192.168.1.114:8000/#/register?index='+user.userInfo.username:'http://qr.liantu.com/api.php?text=123456'} alt=""/>*/}
              </div>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default QRcode;
