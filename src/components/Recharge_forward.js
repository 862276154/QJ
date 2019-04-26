import React, { Component } from 'react';
import { List, Checkbox, Flex, Carousel, Toast } from 'antd-mobile';
import "../public/css/index.css"
import '../public/css/home.css'
import '../public/css/transaction.css'
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import logo from '../public/img/rotate.png'
//search  Sign_in
import search from '../public/img/search.png'
import Sign_in from '../public/img/Sign_in.png'
import right from '../public/img/whrtiht-left.png'
import shop from '../public/img/userimg.png'
// import userimg from '../public/img/userimg.png'
import shop1 from '../public/img/首页_19.png'
import shop2 from '../public/img/首页_22.png'
import shop3 from '../public/img/首页_25.png'
var queryString = require('querystring');
// const AgreeItem = Checkbox.AgreeItem;
var store = require("store")
class Recharge_forward extends Component {
  state = {
    data: [],
    title: 1
  }
  async  componentDidMount() {
    var page = 1
    var size = 10
    var { location } = this.props
    const { history } = this.props
    // return
    location.search = location.search.replace("?", "")
    const parsed = queryString.parse(location.search);
    // console.log(parsed)
    if (parsed.type) {
      this.setState({
        title: parsed.type
      })
    }
    if (parsed.type == 1) {
      this.get_deal(page, size)

    } else if (parsed.type == 2) {
      this.get_deals(page, size)
    } else {
      this.get_deal(page, size)
    }
  }
  async get_deal(page) {
    const { history } = this.props
    await user.recharge_list(page).then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      if (data.code == 1) {
        this.setState({
          data: data.data.data ? data.data.data : ""
        })
      }
    })
  }
  async get_deals(page) {
    await user.buyback_list(page).then(data => {
      if (data.code == 1) {
        this.setState({
          data: data.data.data ? data.data.data : ""
        })
      }
    })
  }
  to_buy(e) {
    const { history } = this.props
    history.push(`/buy?info=${e}`)
  }
  // 选择类型
  onclick(e) {
    this.setState({
      title: e
    })
    var page = 1
    var size = 10
    if (e == 1) {
      this.get_deal(page, size)
    } else {
      this.get_deals(page, size)
    }
  }
  // 确认订单
  async confirm(e) {
    var page = 1, size = 1000;
    await user.confirm(e).then(data => {
      console.log(data)
      if (data.code == 1) {
        Toast.info(data.msg)
        this.get_deals(page, size)
      }
    })
  }
  //


  render() {
    const { history } = this.props
    const { data, title } = this.state
    // console.log(data)
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

        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff" }}>
          <img src={right} onClick={() => history.go(-1)} />
          {title == 1 ? "购买记录" : "出售记录"}
        </div>
        <div className="transaction" style={{ position: "relative", top: ".8rem" }}>
          <div className="tsc-content lock">
            <ul className="ul" >
              <li onClick={this.onclick.bind(this, 1)} className={title == 1 ? "on" : ""}>购买记录</li>
              <li onClick={this.onclick.bind(this, 2)} className={title == 2 ? "on" : ""}>出售记录</li>
            </ul>
          </div>
          <div className="tsc-content content">
            <ul className="ul" >

              {data.map((v, k) => {
                return (
                  <li key={k}  >
                    <img src={v.type == 0 ? v.us_avatar ? fetchs.APIHost + v.us_avatar : shop : v.b_avatar ? fetchs.APIHost + v.b_avatar : shop} alt="" />
                    <div className="right">
                      <p style={{ display: v.shensu == 0 ? "" : "none" }}><span>状态</span>
                        <span>{v.status == 0 ? "订单审核中" : ""} {v.status == 2 ? <b style={{ color: "red" }}>已完成</b> : ""}{v.status == -1 ? "已驳回" : ""} </span>
                      </p>
                      <p style={{ display: v.shensu == 0 ? "none" : "" }}><span>状态</span>
                        <span>{v.shensu == 1 ? <b style={{ color: "red" }}>申诉中</b> : v.shensu == 2 ? <b style={{ color: "red" }}>已完成</b> : <b style={{ color: "red" }}>驳回</b>}</span>
                      </p>
                      <p><span  > 数量</span>  <span style={{ color: "red" }}>{v.sum ? v.sum : v.dz_qdb}</span></p>
                      <p style={{ display: title == 1 ? "none" : "" }}><span> 方式</span>
                        <span style={{ color: "red" }}>  {v.type == 0 ? "支付宝" : ""}{v.type == 2 ? "银行卡" : ""}</span>
                      </p>
                      <p style={{ position: "relative" }}><span>生成时间</span>  <span>{v.created_time}</span> </p>
                      <p style={{ display: v.status == 2&&v.shensu==0 && title == 2 ? "" : "none" }}><span >订单处理:</span>
                        <span className="Appeal" >
                          {/* <span style={{ display: v.shensu == 0||v.shensu == 2 && v.status == 2 ? "" : "none" }} onClick={this.confirm.bind(this, v.id)} >确定完成</span> */}
                          <span style={{ display:  v.shensu == 2&& v.status == 2 ? "none" : "",backgroundColor: "red",textAlign:"center"}}
                           onClick={() => history.push(`/sub_Appeal?id=${v.id}`)} >申诉</span>
                        </span>
                      </p>

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

export default Recharge_forward;
