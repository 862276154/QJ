import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast } from 'antd-mobile';
import '../public/css/App.css'
import '../public/css/Brew.css'
import right from '../public/img/whrtiht-left.png'
// qiandao_bottom
// const AgreeItem = Checkbox.AgreeItem;
import jiuf1 from '../public/img/jiuf (1).png'
import jiuf2 from '../public/img/jiuf (2).png'
import jiuf3 from '../public/img/jiuf (3).png'
import jiuf4 from '../public/img/jiuf (4).png'
import jiuf5 from '../public/img/jiuf (5).png'
import * as fetchs from '../utils/fetch'
import *as user from '../utils/user'
var store = require('store');
class history1 extends Component {
  state = {
    class_list: 1,
    shop_buy_list: [],
    disabled:true
  }
  componentDidMount() {
    var page = 1, size = 1000, status = 1
    this.list(page, size, status)
  }
  list(page, size, status) {
    const { history } = this.props
    user.shop_buy_list(page, size, status).then((data) => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
         history.push("/")
      }
      if (data.code == 1) {
        this.setState({
          shop_buy_list: data.data.data
        })
      }
    })
  }
  class_list(e) {
    this.setState({
      class_list: e
    })
    var page = 1, size = 1000, status = e
    this.list(page, size, status)
  }
  confirm_id(v) {
    var page = 1, size = 1000, status = this.state.class_list
    if (v.status == 1) {
      Toast.info("提交中")
this.setState({
  disabled:false
})
if(this.state.disabled==false) return
      user.confirm_id(v.id).then(data => {
        this.setState({
          disabled:true
        })
        if (data.code == 1) {
          Toast.info(data.msg)
          this.list(page, size, status)
        } else {
          Toast.info(data.msg)
        }
      })
    }
  }
  render() {
    const { history } = this.props
    const { class_list, shop_buy_list } = this.state
    return (
      <div className="res  Brew">
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
        <div className="res-hader " style={{ backgroundColor: "#44041D", color: "#fff" }}>
          <img src={right} onClick={() => history.go(-1)} />
          商品-购买历史
        </div>
        <div className="Buy" style={{ top: ".8rem" }} >
          <div className="class_list" style={{ position: "fixed", width: "100%", backgroundColor: "#fff", zIndex: "1" }}>
            <ul>
              <li className={class_list == 1 ? "on" : ""} onClick={this.class_list.bind(this, 1)}>全部</li>
              <li className={class_list == 2 ? "on" : ""} onClick={this.class_list.bind(this, 2)} >待发货</li>
              <li className={class_list == 3 ? "on" : ""} onClick={this.class_list.bind(this, 3)}>待收货</li>
              <li className={class_list == 4 ? "on" : ""} onClick={this.class_list.bind(this, 4)}>已完成</li>
            </ul>
          </div>
          <ul style={{ position: "relative", top: "1rem", backgroundColor: "#fff",overflowX:"hidden" }}>
            {shop_buy_list.map((v, k) => {
              return (
                <li key={k}>
                  <div className="Brew-footer hader " >
                    <span>
                      订单编号：{v.orderid}
                    </span>
                  </div>
                  <div>
                    <img src={fetchs.APIHost + v.pd_pic_roll[0]}  style={{height:"1.8rem",width:"1.8rem"}} />
                    <div style={{ lineHeight: "1.5", padding: "0", paddingLeft: "10%" }}>
                      <p>{v.product.pd_name}</p>
                      <p>规格:{v.product.pd_unit}</p>
                      <p>价格:{v.pay_way == 1 ? v.ord_qdb : v.ord_qj}</p>
                      <p>生成时间：{v.created_time}</p>
                    </div>
                  </div>
                  <div className="Brew-footer kd" style={{ display: v.kddh ? "inline-block" : "none" }}>
                    <div>
                    快递公司：{v.kdlx}
                    </div>
                    <div>
                      快递单号：{v.kddh}
                    </div>
                  </div>
                  <div className="Brew-footer">
                    <span onClick={this.confirm_id.bind(this, v)}>
                      {v.status == 0 ? "待发货" : ""}
                      {v.status == 1 ? "确认收货" : ""}
                      {v.status == 2 ? "已完成" : ""}
                    </span>
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

export default history1;
