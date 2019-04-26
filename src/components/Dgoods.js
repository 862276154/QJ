import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast } from 'antd-mobile';
import '../public/css/App.css'
import '../public/css/Brew.css'
import right from '../public/img/whrtiht-left.png'
import close from '../public/img/close.png'
import * as fetchs from '../utils/fetch'
import *as user from '../utils/user'

class history1 extends Component {
  state = {
    class_list: 1,
    shop_buy_list: [],
    type: 0,
    sell: "",
    id: ""
  }
  componentDidMount() {
    var page = 1, size = 1000, status = 1
    this.list(page, size, status)
  }
  list(page, size, status) {
    user.dGood(page, size, status).then((data) => {
      // console.log(data)
      // return
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
    this.setState({
      type: v.id,
      sell: v.v,
      id: v.id
    })
  }
  oNclose(v) {
    this.setState({
      type: 0
    })
  }
  oninputs(v, e) {
    e.target.value = ""
  }

  confirm_ids(v) {
    if (v.status == 5) {
      user.confirm_ids(v.id).then(data => {
        if (data.code == 1) {
          Toast.info(data.msg)
        } else {
          Toast.info(data.msg)
        }
      })
    }

  }

  tijiao(a, b) {
    const { history } = this.props
    var { cont, type, shop_details, id, sell } = this.state
    var body = {
      kd_name: this.refs.name.value,
      //  mobel:this.refs.mobel.value,
      id: sell.id,
      kd_DH: this.refs.dz.value
    }
    if (body.kd_name == "") {
      Toast.info("请输入快递公司...");
      return
    }

    if (body.kd_DH == "") {
      Toast.info("请输入快递单号...");
      return
    }
    Toast.info("正在发货...");

    user.sendGood(body).then(data => {
      if (data.code == 1) {
        Toast.info(data.msg)
        this.setState({
          type: 0
        })
        var page = 1, size = 1000, status = this.state.class_list
        this.list(page, size, status)
      } else {
        Toast.info(data.msg)
      }
    })
  }


  render() {
    const { history } = this.props
    const { class_list, shop_buy_list, type, sell } = this.state
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
        .contenter .loser{
          text-align: center;
        }
        .close{
          position: absolute;
          right: 2%;
        }
        .user-res-input.pwd .user-content .form span,.user-res-input.pwd .user-content .form p{
          line-height: .6rem;
        }
        .user-content input{
          width: 72%;
        }
        .user-res-input.pwd .user-content .form, .user-res-input{
          padding:0;
        }
        .contenter .loser .contenters .cont_in{
          margin-bottom: 0.6rem;
        }
         `}
        </style>
        <div className="res-hader " style={{ backgroundColor: "#44041D", color: "#fff" }}>
          <img src={right} onClick={() => history.go(-1)} />
          商品发货
        </div>
        <div className="Buy" style={{ top: ".8rem", position: "relative" }}  >
          <div className="class_list" style={{ position: "fixed", width: "100%", backgroundColor: "#fff", zIndex: "1" }}>
            <ul>
              <li className={class_list == 1 ? "on" : ""} onClick={this.class_list.bind(this, 1)}>全部</li>
              <li className={class_list == 2 ? "on" : ""} onClick={this.class_list.bind(this, 2)} >待发货</li>
              <li className={class_list == 3 ? "on" : ""} onClick={this.class_list.bind(this, 3)}>待收货 </li>
              <li className={class_list == 4 ? "on" : ""} onClick={this.class_list.bind(this, 4)}>已完成</li>
              {/* <li className={class_list == 5 ? "on" : ""} onClick={this.class_list.bind(this, 5)}>待处理</li> */}
            </ul>
          </div>
          <ul style={{ position: "relative", top: "1rem", backgroundColor: "#fff", overflowX: "hidden" }}>
            {shop_buy_list.map((v, k) => {
              return (
                <li key={k}>
                  <div className="Brew-footer hader " >
                    <span>
                      订单编号：{v.orderid}
                    </span>
                  </div>
                  <div>
                    <img src={fetchs.APIHost + v.pd_pic_roll[0]} style={{ height: "1.8rem", width: "1.8rem" }} />
                    <div style={{ lineHeight: "1.5", padding: "0", paddingLeft: "10%" }}>
                      <p>收货人：{v.ord_name}</p>
                      <p>收货地址：{v.ord_addr}</p>
                      <p>电话:{v.ord_tel}</p>
                      <p>品名:{v.product.pd_name}</p>
                      <p>规格:{v.product.pd_unit}</p>
                      <p>数量:{v.num}</p>
                      <p>生成时间：{v.created_time}</p>
                    </div>
                  </div>
                  <div className="Brew-footer kd" style={{ display: v.kddh || v.status == 6 && v.status != 6 ? "inline-block" : "none" }}>
                    <div>
                      快递公司：{v.kdlx}
                    </div>
                    <div>
                      快递单号：{v.kddh}
                    </div>
                    {/* <span onClick={this.confirm_ids.bind(this, v)} >{v.status == 5 ? "确认收货" : "已完成"} </span> */}
                  </div>
                  <div className="Brew-footer" style={{ height: ".6rem" }}>
                    <i style={{ float: "left" }}>
                      {v.status == 0 ? "待发货" : ""}
                      {v.status == 1 ? "等待客户收货" : ""}
                      {v.status == 2 ? "已完成" : ""}
                    </i>
                    {v.status == -1 || v.status == 0 ?
                      <span onClick={this.confirm_id.bind(this, { v, "id": 2 })}>
                        发货
                    </span> : ""}
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="contenter" style={{ display: type >= 1 ? "block" : "none" }}>
            <div className=" loser" style={{ display: type == 2 ? "block" : "none" }}>
              <div className="contenters">
                <div style={{ position: "relative" }}>发货 <span className="close">  <img onClick={this.oNclose.bind(this, 2)} src={close} alt="" /></span></div>
                <div className="user-res-input pwd" style={{ width: "100%", borderRadius: 0, top: ".8rem" }}>
                  <div className="user-content">
                    <div className="form" >   <span>快递公司</span> <input type="text" ref="name" placeholder="快递公司" /> </div>
                    <div className="form" >   <span>快递单号</span> <input type="text" ref="dz" placeholder="快递单号" />    </div>
                  </div>
                </div>
                <span className="subm" onClick={this.tijiao.bind(this, 111)} > 确认</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default history1;
