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
import userimg from '../public/img/userimg.png'
import * as fetchs from '../utils/fetch'
import *as user from '../utils/user'
var store = require('store');
class Recharge_forwards extends Component {
  state = {
    class_list: 1,
    shop_buy_list: [],
    user_infos:""
  }
  componentDidMount() {
    var page = 1, size = 1000, status = 1
    this.list(page, size, status)
    var user_infos= store.get("user_info")
    console.log(user_infos)
    if(user_infos){
      this.setState({
        user_infos:user_infos
      })
    }
  }
  list(page, size, status) {
    const { history } = this.props
    user.log(page, size, status).then((data) => {
      
      // return
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
      user.confirm_id(v.id).then(data => {
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
    const { class_list, shop_buy_list,user_infos } = this.state
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
        .Brew ul li div p{
          font-size: .3rem;
        }
        .Brew .class_list ul{
          border-bottom: .1rem solid #ccc;
        }
        .Brew .class_list ul li.on{
          color: #571d33;
          font-weight: 600;
        }
        .Brew .class_list ul li{
          color: #ccc;
        }
         `}
        </style>
        <div className="res-hader " style={{ backgroundColor: "#44041D", color: "#fff" }}>
          <img src={right} onClick={() => history.go(-1)} />
          {class_list==1?"QJ明细":""}
          {class_list==2?"QDB明细":""}
          {class_list==3?"酿力明细":""}
        </div>
        <div className="Buy" style={{ top: ".8rem" }} >
          <div className="class_list" style={{ position: "fixed", width: "100%", backgroundColor: "#fff", zIndex: "1" }}>
            <ul>
              <li className={class_list == 1 ? "on" : ""} onClick={this.class_list.bind(this, 1)}>QJ明细</li>
              <li className={class_list == 2 ? "on" : ""} onClick={this.class_list.bind(this, 2)} >QDB明细</li>
              <li className={class_list == 3 ? "on" : ""} onClick={this.class_list.bind(this, 3)}>酿力明细</li>
            </ul>
          </div>
          <ul style={{ position: "relative", top: "1rem", backgroundColor: "#fff",overflowX:"hidden" }}>
            {shop_buy_list.map((v, k) => {
              return (
                <li key={k}>
              
                  <div style={{display:"flex" ,alignItems:"center"}}>
                  <img src={ fetchs.APIHost + user_infos.us_avatar}  style={{height:"1rem",width:"1rem"}} />
                    <div style={{ lineHeight: "1.5", paddingLeft: ".2rem" }}>
                      <p  style={{color:"#ccc"}}>类型：<span style={{color:"#000"}}>{v.note}</span> </p>
                      <p style={{color:"rgba(137,42,79,1)"}}>数量：<span style={{color:parseInt(v.sum)<0?"#1ee842":"red" }}>{v.sum}</span> </p>
                      <p style={{color:"#ccc"}}>生成时间：<span style={{color:"#000"}}>{v.create_time}</span> </p>
                    </div>
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

export default Recharge_forwards;
