import React, { Component } from 'react';
import { List, Checkbox, Flex, Carousel, Toast } from 'antd-mobile';
import "../public/css/index.css"

import '../public/css/myCenter.css'
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import money from '../public/img/money.png'
import set from '../public/img/set.png'
import userimg from '../public/img/userimg.png'
import userimg1 from '../public/img/我的_18.png'
import userimg2 from '../public/img/我的_12.png'
import userimg3 from '../public/img/我的_15.png'
import userimg4 from '../public/img/admin_shop.png'
import userimg5 from '../public/img/我的_27.png'
import userimg6 from '../public/img/我的_30.png'
import userimg7 from '../public/img/我的_37.png'
import userimg8 from '../public/img/我的_35.png'
import shop_h from '../public/img/shop_h.png'
import jil from '../public/img/jil.png'
var store = require('store');


// const AgreeItem = Checkbox.AgreeItem;

class myCenter extends Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: "4.18rem",
    user_info: ""
  }
  componentDidMount() {
    const { history } = this.props
    var user_logo = store.get("user")
    if (user_logo) {
      var body = {
        us_tel: user_logo.us_tel,
        us_pwd: user_logo.us_pwd
      }
      user.sendGoodNum().then(data => {
        if (data.code == 4) {
          Toast.info(data.msg, 1)
          store.remove("user_infos")
          history.push("/")
        }
        this.setState({
          num: data.data
        })
      })
      user.login({ body }).then(data => {

        // console.log(data.data)
        if (data.code == 4) {
          Toast.info(data.msg, 1)
          store.remove("user_infos")
          history.push("/")
        }
        var user_info = data.data
        if (data.code == 1) {
          store.set("user_info", user_info)
        }
        if (user_info) {
          this.setState({
            user_info: user_info,
            // imgUrl: user_info.us_avatar
          })

          // 更新默认参数


        }
      })
    }
    var user_info = store.get("user_info")
    // console.log(user_info)
    if (user_info) {
      this.setState({
        user_info: user_info
      })
    }
  }
  res() {
    const { Checkbox } = this.state
    // const Checkbox=this.state.Checkbox
    // console.log(Checkbox)
  }
  bidng() {
    const { history } = this.props
    const { user_info } = this.state
    // history.push("/binding") 
    // return
    if (user_info.bind != 1) {
      history.push("/binding")
    } else {
      Toast.info("您已绑定过信息了，无需再次绑定")
    }

  }
  outLogin() {
    const { history } = this.props
    store.remove("user")
    store.remove("user_info")
    store.remove("type")
    history.push("/")
  }

  async open_shop() {
    const { history } = this.props
    await user.merchant().then(data => {
      // console.log(data)
      if (data.code == 0) {
        if (data.msg == "审核已通过") {
          history.push("/Releases")
        } else {
          Toast.info(data.msg)
        }
      } else {
        history.push("/Storeapplication")
      }
    })
  }
  render() {
    const { history } = this.props
    const { user_info, acc_qdb, acc_qj, us_name, id, num } = this.state
    const app = this
    return (
      <div className="my-center">
        <div className="my-center-hader">
          <img onClick={() => history.push("/user_info")} className="set-my-center" src={set} alt="" />
          <div className="user-info">
            <img onClick={() => history.push("/user_info")} src={user_info.us_avatar ? fetchs.APIHost + user_info.us_avatar : userimg} alt="" />
            <p>
              昵称:{user_info.us_name}
            </p>
            <p>
              ID:{user_info.id}
            </p>
            <div   onClick={() => history.push("/Recharge_forwards")} >
              <div style={{ width: "33.3333333333%", margin: ".01rem auto", lineHeight: "1.5",borderBottom:".02rem solid #571d33" }}>
                <img style={{ width: "0.4rem", height: "0.4rem", borderRadius: "0" }} src={jil} alt="" />
                <p style={{color:"#571d33",fontFamily:"PingFang-SC-Regular",fontSize:".3rem"}}>收支记录</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-QJB">
          <p>
            <img src={money} alt="" />
            <span>
              QJ:{user_info.acc_qj}
            </span>
          </p>
          <p>
            <img src={money} alt="" />
            <span>
              QDB:{user_info.acc_qdb}
            </span>
          </p>

        </div>

        <div className="my-option-list">
          <ul className="ul">
            <li onClick={() => history.push("/myWallet")}>
              <img src={userimg1} alt="" />
              <p>钱包</p>
            </li>
            <li onClick={() => history.push("/QRcode")} >
              <img src={userimg2} alt="" />
              <p>我的推广链接</p>
            </li>
            <li onClick={this.open_shop.bind(this)}>
              <img src={userimg4} alt="" />
              <p>店铺管理</p>
              <span className="num">{num}</span>
            </li>
            <li onClick={() => history.push("/history1")}>
              <img src={shop_h} alt="" />
              <p>已购商品</p>
            </li>
            <li onClick={() => history.push("/history")}>
              <img src={userimg3} alt="" />
              <p>我的藏酒</p>
            </li>

            <li onClick={() => history.push("/Lock_Position")}>
              <img src={userimg5} alt="" />
              <p>锁仓</p>
            </li>
            <li onClick={() => history.push("/Releases1")}>
              <img src={userimg6} alt="" />
              <p>绑定信息</p>
            </li>
            <li onClick={() => history.push("/Sign")}>
              <img src={userimg7} alt="" />
              <p>签到</p>
            </li>
            <li>
              <img src={userimg8} alt="" onClick={() => history.push("/Change")} />
              <p>安全设置</p>
            </li>
          </ul>

          <div className="out">
            <button onClick={this.outLogin.bind(this)} >退出登录</button>
          </div>
        </div>
      </div>
    );
  }
}

export default myCenter;
