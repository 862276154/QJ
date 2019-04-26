import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast } from 'antd-mobile';
import '../public/css/App.css'
import '../public/css/buy.css'
import * as user from '../utils/user'
import right from '../public/img/left0.png'
var store = require('store');
const queryString = require('query-string');
const AgreeItem = Checkbox.AgreeItem;

class Res extends Component {
  state = {
    codeimg: "",
    conYzm: "",
    ched: false,
    text_code: "获取验证码",
    dis: false,
    value: "",
    v: 1
  }
  async componentDidMount() {
    var { location, history } = this.props
    location.search = location.search.replace("?", "")
    const parsed = queryString.parse(location.search);
    if (parsed.p_tel) {
      parsed.p_tel ? this.refs.p_tel.value = parsed.p_tel : "",
        this.setState({
          dis: true
        })
    }
    await user.doc().then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      // console.log(data.data[0])
      if (data.code == 1) {
        this.setState({
          value: data.data[4]
        })
      }

      this.setState({
        data: data.data ? data.data : ""
      })
      if (data.data.type == 1) {
        this.setState({
          title: 1
        })
      }
    })
  }


  iSChinese(e) {
    // return
    var a = e.target.value
    if (/[\u4E00-\u9FA5]/i.test(a)) {
      // alert('有中文');
      e.target.value = null
    }
    // else{
    // alert('没有中文 通过');
    // }
  }
  res_btn() {
    const { history } = this.props
    var us_name = this.refs.us_name.value,//用户名
      us_pwd = this.refs.us_pwd.value,//密码
      us_pwds = this.refs.us_pwds.value,//密码
      us_tel = this.refs.us_tel.value,//手机号（登录用户名）
      p_tel = this.refs.p_tel.value,//推荐人
      pay_pwd = this.refs.pay_pwd.value,// 支付密码
      code = this.refs.code.value,
      pay_pwds = this.refs.pay_pwds.value;// 支付密码
    if (this.state.ched == false) {
      Toast.info("请同意用户协议！", 1)
      return
    }
    if (!us_name) { return Toast.info("请输入姓名", 1) }
    if (!us_tel) { return Toast.info("请输入手机号", 1) }
    if (us_tel.length != 11) {
      us_tel == " "
      Toast.info("手机号必须是11位", 1)
      return
    }
    // if (!p_tel) { return Toast.info("请输入推荐人", 1) }
    if (!us_pwd) { return Toast.info("请输入登录密码", 1) }
    if (us_pwd.length < 6) {
      return Toast.info("登录密码长度不足", 1)
    }
    if (!us_pwds) { return Toast.info("请再次输入登录密码", 1) }
    if (us_pwd != us_pwds) { return Toast.info("两次密码不一致", 1) }
    if (!pay_pwd) { return Toast.info("请输入交易密码", 1) }
    if (!pay_pwds) { return Toast.info("请再次输入交易密码", 1) }
    if (pay_pwds.length < 6) {
      return Toast.info("交易密码长度不足", 1)
    }
    if (pay_pwd != pay_pwds) { return Toast.info("两次密码不一致", 1) }
    if (!code) { return Toast.info("请输入验证码", 1) }
    // return  
    var body = {
      us_name, us_pwd, us_tel, pay_pwd, p_tel, code
    }
    var res = user.res(body).then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      // console.log(data)
      if (data.code == 1) {
        Toast.info(data.msg, 1)
        store.set("bind", data)

        setTimeout(() => {
          history.push("/home/home")

        }, 1000)

      } else {
        Toast.info(data.msg, 1)
      }
    })
  }
  MSG() {
    var mobile = this.refs.us_tel.value
    const { history } = this.props
    if (!mobile) {
      return Toast.info("请输入手机号", 1)
    }
    var data = {
      mobile
    }
    user.sms(data).then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
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
  ok_no(v) {
    const { history } = this.props
    if (v == 1) {
      this.setState({
        v: v
      })
    } else {
      this.setState({
        v: 1
      })
    }
  }
  doc() {
    console.log(this.state.v)
    this.setState({
      v: 0
    })
  }
  render() {
    const { history } = this.props
    const { text_code, dis, v, value } = this.state
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
        .buy {
          // text-align: left;
          background-color: #fff;
          padding: 0 .3rem;
      
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
      }

         `}
        </style>
        <div className="res-hader">
          <img src={right} onClick={() => history.go(-1)} />
          注册
          </div>
        <div className="buy">
          <div className="doc" style={{ display: v == 0 ? "block" : "none" }}>
            <div dangerouslySetInnerHTML={{ __html: value.value }}></div>

            <div className="confirm">
              <button onClick={this.ok_no.bind(this, 0)}>取消</button>
              <button onClick={this.ok_no.bind(this, 1)}>确认</button>
            </div>
          </div>
        </div>

        <div className="user-res-input" >

          <div className="user-content">
            <div className="form"><font>*</font><span>姓   &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;名:</span>
              <input ref="us_name" placeholder="真实姓名" /> </div>
            <div className="form"><font>*</font><span>手&nbsp; 机 &nbsp;号:</span>
              <input onChange={this.iSChinese.bind(this)} ref="us_tel" placeholder="作为登录账号" /> </div>
            <div className="form"><font>*</font><span>推 荐   &nbsp;人:</span>
              <input onChange={this.iSChinese.bind(this)} ref="p_tel" disabled={dis} placeholder="推荐人" /> </div>
            <div className="form"><font>*</font><span>登录密码：</span>
              <input onChange={this.iSChinese.bind(this)} ref="us_pwd" placeholder="6-18位字符" /> </div>
            <div className="form"><font>*</font><span>重复密码：</span>
              <input onChange={this.iSChinese.bind(this)} ref="us_pwds" placeholder="请再次输入密码" /> </div>
            <div className="form"><font>*</font><span>交易密码:</span>
              <input onChange={this.iSChinese.bind(this)} ref="pay_pwd" placeholder="6-18位字符" /> </div>
            <div className="form"><font>*</font><span>重复密码:</span>
              <input onChange={this.iSChinese.bind(this)} ref="pay_pwds" placeholder="请再次输入密码" />
            </div>
            {/* <div className="form-yzm"><span><input  placeholder="请输入图形验证码" /></span> <span className="yzm">0000</span></div> */}
            <div className="form-yzm">
              <span><input ref="code" placeholder="请输入短信验证码" /></span>
              <span onClick={this.MSG.bind(this)} ><button className="text_code" disabled={this.state.disabled} >{text_code}</button></span>
            </div>
            <div className="checkbox">
              <AgreeItem data-seed="logId" onChange={e => this.setState({
                ched: !this.state.ched
              })}>
                我已同意 <a onClick={(e) => { e.preventDefault(); this.doc() }}> 《用户协议》 </a>
              </AgreeItem>
            </div>
            <div className="user-res-btn" style={{ textAlign: "center" }}>
              <button onClick={this.res_btn.bind(this)}> 注册</button>
              <span>已有账号？ <a href="/">立即登录</a></span>
            </div>


          </div>

        </div>


      </div>
    );
  }
}

export default Res;
