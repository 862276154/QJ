import React, { Component } from 'react';
import { List, Checkbox, Flex, Carousel,Toast } from 'antd-mobile';
import "../public/css/index.css"
import '../public/css/home.css'
import '../public/css/transaction.css'
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import logo from '../public/img/rotate.png'
import search from '../public/img/search.png'
import Sign_in from '../public/img/Sign_in.png'
import right from '../public/img/whrtiht-left.png'
import shop from '../public/img/userimg.png'
import shop1 from '../public/img/首页_19.png'
import shop2 from '../public/img/首页_22.png'
import shop3 from '../public/img/首页_25.png'
// import { TIMEOUT } from 'dns';
var store = require('store');



class transaction extends Component {
  state = {
    data: [],
    type:0
  }
  async  componentDidMount() {
    const { history } = this.props
    Toast.info("加载中...", 1)
    var user_logo = store.get("user")
    if (user_logo) {
      var body = {
        us_tel: user_logo.us_tel,
        us_pwd: user_logo.us_pwd
      }
      user.sendGoodNum().then(data=>{
        if (data.code == 4) {
          Toast.info(data.msg, 1)
          store.remove("user_infos")
           history.push("/")
        }
        // console.log(data)
        this.setState({
          num:data.data
        })
      })
      user.rate().then(data => {
        if (data.code == 4) {
          Toast.info(data.msg, 1)
          store.remove("user_infos")
           history.push("/")
        }
        console.log(data)
        if (data.code == 1) {
            this.setState({
                rate: data.data
            })
        }
    })
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
    // var user_info = store.get("user_info")
    // console.log(user_info)
    var page = 1
    var size = 10,type=0
    this.get_deal(page, size,type)

  }
}

  async get_deal(page, size, type) {
    const { history } = this.props
    await user.deal(page, size, type).then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
         history.push("/")
      }
      // console.log(data)
    
      if (data.code == 1) {
        this.setState({
          data: data.data.data ? data.data.data : ""
        })
      }
    })
  }

  sell() {
    var page = 1,
      size = 10,
      type = 1;
      this.setState({
        type
      })
    // console.log(type)
    this.get_deal(page, size, type)
  }
  buy() {
    var page = 1,
      size = 10,
      type = 0;
      this.setState({
        type
      })
    // console.log(type)
    this.get_deal(page, size, type)
  }

  to_buy(e) {
    const { history } = this.props
    history.push(`/buy?info=${e}`)
  }
  render() {
    const { history } = this.props
    const { data,user_info ,type} = this.state
    console.log(this.state.rate)
  
    const app = this
    return (
      <div className="res tsc ">
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
        .am-carousel-wrap{
          margin-bottom: 24px;
        }
         `}
        </style>
        <div className="res-hader" style={{ position: "relative", width: "100%" }}>
          交易大厅
        </div>
        <div className="transaction">
          <div className="transaction-content ">
            <div>
              <span onClick={() => history.push("/MY_buy?my=1")} >出让</span><span onClick={() => history.push("/MY_buy?my=0")}>购买 </span>

            </div>
            <img src={logo} className="rotate" alt="" />
            <h3>
              <p>QJ</p>
              {user_info?user_info.acc_qj:""}
            </h3>
            <div className="yulou">
              {/* 剩余琼浆玉露{user_info?user_info.acc_qj:""} */}
              <p>今日QJ兑换价值 { this.state.rate}QDB</p>
            </div>
            <div style={{textAlign:"right"}}>
              <span onClick={()=>history.push("/transaction_history")}>交易记录</span>
            </div>
          </div>
          <div className="tsc-content content" style={{top:"3.6rem"}}>
            <div className="tst-history">
              <button onClick={this.buy.bind(this)}>出让信息</button>
              <button onClick={this.sell.bind(this)}>购买信息</button>
            </div>
            <ul className="ul">
              {data.map((v, k) => {
                return (
                  <li key={k} onClick={this.to_buy.bind(this, v.id)}>
                    <img src={v.type == 0 ? v.us_avatar ? fetchs.APIHost + v.us_avatar : shop : v.b_avatar ? fetchs.APIHost + v.b_avatar : shop} alt="" />
                    <div className="right">
                      <p><span>账号 </span>      <span>{v.type == 0 ? "" + v.us_name : "" + v.bname} </span></p>
                      {/* <p><span>价格</span>      <span>{v.price} <span style={{ color: "red" }}>QDB</span></span></p> */}
                      <p><span>{type==1?"购买数量":"出让数量"}</span>  <span>{v.num}</span></p>
                      <p><span>{type==1?"购买时间":"出让时间"}</span>  <span>{v.deal_time}</span></p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default transaction;
