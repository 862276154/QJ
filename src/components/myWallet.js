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
import userimg4 from '../public/img/我的_24.png'
import userimg5 from '../public/img/我的_27.png'
import userimg6 from '../public/img/我的_30.png'
import userimg7 from '../public/img/我的_37.png'
import userimg8 from '../public/img/我的_35.png'
import shop_h from '../public/img/shop_h.png'
import right from '../public/img/whrtiht-left.png'
import shop from '../public/img/userimg.png'
import { pipeline } from 'stream';
var store = require('store');


// const AgreeItem = Checkbox.AgreeItem;

class myWallet extends Component {
  state = {
    data: [],
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
    this.get_deal()
  }
  res() {
    const { Checkbox } = this.state
    // const Checkbox=this.state.Checkbox
    // console.log(Checkbox)
  }
  bidng() {
    const { history } = this.props
    const { user_info } = this.state
    if (user_info.bind != 1) {
      history.push("/binding")
    } else {
      Toast.info("您已绑定过信息了，无需再次绑定")
    }
  }
  to2(v) {
    var v = v
    // console.log(v)
    // return 
    if (v) {
      return parseInt(v).toFixed(0)
    }
  }
  async get_deal(page) {
    const { history } = this.props
    Toast.loading("加载中",1)
    await user.recharge_lists(page).then(data => {
      // console.log(data.data)

      // return
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      console.log(data.data)
      // return
      if (data.code == 1) {
        this.setState({
          data: data.data ? data.data : ""
        })
      }
    })
  }
  render() {
    const { history } = this.props
    const { user_info, acc_qdb, acc_qj, us_name, id, data } = this.state
    const app = this
    return (
      <div className="my-center myWallet">
        <div className="res-hader " style={{ backgroundColor: "#44041D", color: "#fff" }}>
          <img src={right} onClick={() => history.go(-1)} />
          账户总览
        </div>
        <div className="my-center-hader myWallet">
          {/* <img onClick={() => history.push("/user_info")} className="set-my-center" src={set} alt="" /> */}
          <div className="user-info">
            {/* <img src={userimg} alt="" /> */}
            <p style={{ fontSize: "0.28rem" }}>
              我的QDB
            </p>
            <h2>  {this.to2(user_info.acc_qdb)}</h2>
            <div className="my-QJB myWallets ">
              <div className="p">
                <p>{user_info.acc_niangli}</p>
                <span>
                  酿力值
                </span>
              </div>
              <div className="p">
                <p>{user_info.tdrs}</p>
                <span>
                  推广会员数量
                </span>
              </div>
              <div className="p">
                <p>{user_info.acc_qj}</p>
                <span>
                  QJ
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-QJB btn">
          <p onClick={() => history.push("/Recharge")}>  QDB购买  </p>
          <p onClick={() => history.push("/Put_forward")}>   QDB出售   </p>
          <p onClick={() => history.push("/Recharge_forward")}>    历史记录   </p>
        </div>
        <div className="tsc-content content" style={{ position: "relative", top: "inherit" }}>
          <h2 style={{ textAlign: "center", fontSize: '.34rem', padding: ".3rem", borderBottom: ".1rem solid #571d33 ", backgroundColor: "#571d33", color: '#fff' }}>我的锁仓信息</h2>
          <ul className="ul" style={{ maxHeight: "6rem" }} >
            <p style={{display:data.length<=0?"":"none", textAlign: "center", padding: ".3rem", color: "#ccc" }}>{data.length <= 0 ? "暂无信息!" : ""}</p>
            {data.map((v, k) => {
              return (
                <li key={k}  >
                  <img src={v.type == 0 ? v.us_avatar ? fetchs.APIHost + v.us_avatar : shop : v.b_avatar ? fetchs.APIHost + v.b_avatar : shop} alt="" />
                  <div className="right">
                    <p><span>状态</span>
                      <span>{v.status == 0 ? "已到期" : "锁仓中"}  </span>
                    </p>
                    <p><span  > 数量</span>  <span style={{ color: "red" }}>{v.sum ? v.sum : v.dz_qdb}</span></p>
                    <p><span  > 锁仓天数</span>  <span style={{ color: "red" }}>{v.has_day ? v.has_day + "天" : ""}</span></p>
                    <p><span  > 锁仓币种</span>  <span style={{ color: "red" }}>{v.type == 1 ? "QJ" : "QDB"}</span></p>

                    {/* <p style={{display:title==1?"none":""}}><span> 方式</span>
                        <span style={{color:"red"}}>  {v.type == 0 ? "微信" : ""}{v.type == 1 ? "支付宝" : ""}{v.type == 2 ? "银行卡" : ""}</span>
                      </p> */}
                    <p><span>生成时间</span>  <span>{v.created_time}</span></p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default myWallet;
