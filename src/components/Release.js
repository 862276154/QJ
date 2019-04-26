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
class Release extends Component {
  state = {
    class_list: 1,
    product_list: []
  }

  componentDidMount() {
    var page = 1, size = 1000, status = this.state.class_list
    this.product_list(page, size, status)
  }
  product_list(page, size, status) {
    const { history } = this.props
    user.product_list(page, size, status).then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
         history.push("/")
      }
      // console.log(data)
      if (data.code == 1) {
        this.setState({
          product_list: data.data.data
        })
      }

    })

  }

  class_list(e) {

    this.setState({
      class_list: e
    })
      Toast.info("加载中...",1)
    var page = 1, size = 1000, status = e
    this.product_list(page, size, status)

  }
  confirm_id(v) {
    var page = 1, size = 1000, status = this.state.class_list
    var _this=this
    if (v.status == 1||v.status==0) {
      user.confirm_xj(v.id).then(data => {
        if (data.code == 1) {
          Toast.info(data.msg)
          // _this.list(page, size, status)
        } else {
          Toast.info(data.msg)
        }
      })
    }
  }
  render() {
    const { history } = this.props
    const { class_list, product_list } = this.state

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
          我的发布
        </div>
        <div className="Buy " style={{ top: ".8rem" }}  >
          <div className="class_list" style={{ position: "fixed", width: "100%", backgroundColor: "#fff", zIndex: "1" }}>
            <ul >
              <li className={class_list == 1 ? "on" : ""} onClick={this.class_list.bind(this, 1)}>全部</li>
              <li className={class_list == 2 ? "on" : ""} onClick={this.class_list.bind(this, 2)} >正在上架</li>
              <li className={class_list == 3 ? "on" : ""} onClick={this.class_list.bind(this, 3)}>已删除</li>
              <li className={class_list == 4 ? "on" : ""} onClick={this.class_list.bind(this, 4)}>待审核</li>
              <li className={class_list == 5 ? "on" : ""} onClick={this.class_list.bind(this, 5)}>已驳回</li>
              
            </ul>
          </div>
          <ul style={{ position: "relative", top: "1rem", backgroundColor: "#fff" }}>
            {product_list.map((v, k) => {
              return (
                <li key={k}>
                  <div className="Brew-footer hader">
                    <span>
                      分类 : {v.product_cate?v.product_cate.cate_name?v.product_cate.cate_name:v.product_cate.cate_name:""}
                    </span>
                  </div>
                  <div>
                    <span className="img">   <img src={v.pd_pic_roll[0] ? fetchs.APIHost + v.pd_pic_roll[0] : jiuf1} /></span>
                    <div style={{width:"60%"}}>
                      <p className="name"> {v.pd_name}</p>
                      <p>QJ 价格：{v.pd_qj}</p>
                      <p>QDB 价格：{v.pd_qdb}</p>
                      <p>发布时间：{v.create_time}</p>
                    </div>
                  </div>
                  <div className="Brew-footer" style={{ display: v.status == 1 ? "block" : "none" }} >
                    <span onClick={this.confirm_id.bind(this, v)} >
                      {v.status == 1 ? "删除" : ""}
                      {/* {v.status == 0 ? "上架" : ""} */}
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

export default Release;
