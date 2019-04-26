import React, { Component } from 'react';

import logo from '../public/img/login.png';
import '../public/css/index.css'
import '../public/css/login.css'
import * as user from '../utils/user'
import * as fetchs from '../utils/fetch'
import ico_1 from '../public/img/ico_1.png'
import ico_2 from '../public/img/ico_2.png'
import { Button, WhiteSpace, Toast, List, Checkbox, Flex } from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
var store = require('store');
class login extends Component {
  state = {
    value: "1",
    yzhe: "",
    ched: false,
    text_code: "获取",
    ok_login: ""
  }
  async componentDidMount() {
    //  Toast.info("当前")
    await user.web().then(data => {
      // console.log(data)
      if (data.data == 0) {
        Toast.info(data.msg, 0)
      }
      if (data.data.WEB_SF == 0) {
        this.setState({
          yzhe: false
        })
      } else {
        this.setState({
          yzhe: true
        })
      }
    })
    var login = store.get("login")
    var ok_login = store.get("ok_login")
    if (login) {
      if (ok_login) {
        this.setState({
          ok_login
        })
        this.refs.mobile.value = login.us_tel
        this.refs.us_pwd.value = login.us_pwd
      } else {
        return
      }

    }
    await user.logo().then(data => {
      // console.log(data.data.value)
      if (data.code == 1) {
        store.set("log", data.data.value)
        this.setState({
          log: data.data.value
        })
      }
    })
    // console.log(data);
  }
  left() {
    const { history } = this.props
    history.push("/res")
  }
  async login() {

    const { history } = this.props
    // history.push("/home/home")
    // return
    var us_tel = this.refs.mobile.value, us_pwd = this.refs.us_pwd.value, code = this.refs.code.value
    // user.login()
    var body = {
      us_tel, us_pwd, code,
    }



    if (!us_tel) {
      return Toast.info("请输入账号！")
    }
    if (!us_pwd) {
      return Toast.info("请输入密码！")
    }
    if (this.state.yzhe == true) {
      if (!code) {
        return Toast.info("请输入验证密码！")
      }
    }

    Toast.loading("登陆ing...", 0)
    await user.login2(body).then(data => {
      // console.log(data)
      if (data.code == 1) {
        Toast.info("登陆成功", 2)
        store.set("user_info", data.data)
        store.set("user_infos", data.data)
        fetchs.login(us_tel, us_pwd)
        // 判断 记住密码和 自动登陆 
        if (this.state.ok_login >= 0) {
          store.set("login", body)
          store.set("ok_login", this.state.ok_login)
        }
        history.push("/home");
      } else {
        Toast.info(data.msg, 2)
        if (data.msg == "验证码错误") {
          window.location.reload(true);
        } else if (data.msg == "密码错误") {
          store.remove("login")
          this.setState({
            ok_login: 0
          })
        }
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
  onChange = (val) => {
    console.log(val);
    if (val.value == 0) {
      console.log(this.state.ok_login == 1)
      if (this.state.ok_login == 1) {
        this.setState({
          ok_login: 0
        })
      } else {
        this.setState({
          ok_login: 1
        })
      }

    } else if (val.value == 1) {
      if (this.state.ok_login == 2) {
        this.setState({
          ok_login: 1
        })
      } else {
        this.setState({
          ok_login: val.value + 1
        })
      }
    }
  }

  render() {
    const { history } = this.props
    const { value, text_code, log, ok_login } = this.state
    const data = [
      { value: 0, label: '记住密码' },
      { value: 1, label: '自动登陆' },
    ];
    console.log(ok_login)
    return (
      <div className="app-login" style={{ minHeight: "100%" }} >
        <div className="App login" >
          <header className="App-header">
            <img src={log ? fetchs.APIHost + log : logo} className="App-logo login-img" alt="logo" />
          </header>
          <div className="user-login" style={{ marginBottom: "0.4rem" }}>
            <div><span>账号</span>
              <input ref="mobile" placeholder="请使用手机号" />
            </div>
            <div><span>密码</span>
              <input ref="us_pwd" type="password" placeholder="输入密码" />
            </div>
            <div className="form" style={{ position: "relative", display: this.state.yzhe == true ? "block" : "none" }}><span>验证码</span>
              <input ref="code" placeholder="验证码" /> <button onClick={this.forgetCode.bind(this)} className="yzm" disabled={this.state.disabled} >{text_code}</button>
            </div>
          </div>
          <div className="user-res-user-password Check " style={{ paddingTop: 0, position: "relative" }}>
            {/* {data.map((v, k) => {
              return (
                <div key={k} onClick={this.onChange.bind(this, v)} ><img src={ok_login == 0 ? ico_1 : ico_2} />{v.label}</div>
              )
            })} */}
            <div onClick={this.onChange.bind(this, data[0])} ><img src={ok_login >= 1 ? ico_2 : ico_1} />{data[0].label}</div>
            <div onClick={this.onChange.bind(this, data[1])} ><img src={ok_login >= 2 ? ico_2 : ico_1} />{data[1].label}</div>

          </div>

          <button className="login-btn" onClick={this.login.bind(this)} >登陆</button>
          <div style={{ paddingTop: ".3rem" }}>
            <a style={{ color: "#ffffff" }} href="http://www.qj1588.cn/download/index.html">下载app</a>
          </div>
          <div className="user-res-user-password">
            <span onClick={this.left.bind(this)} className="left">注册账号</span>
            <span className="right" onClick={() => history.push("/Forget_pwd")}>忘记密码?</span>
          </div>
        </div>
      </div>

    );
  }
}

export default login;
