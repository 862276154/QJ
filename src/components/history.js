import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast } from 'antd-mobile';
import '../public/css/App.css'
import '../public/css/Brew.css'
import right from '../public/img/whrtiht-left.png'
import close from '../public/img/close.png'
import * as fetchs from '../utils/fetch'
import *as user from '../utils/user'
var store = require('store');
class history1 extends Component {
  state = {
    class_list: 1,
    shop_buy_list: [],
    type: 0,
    sell:"",
    id:""
  }
  componentDidMount() {
    var page = 1, size = 1000, status = 1
    this.list(page, size, status)
  }
  list(page, size, status) {
    const { history } = this.props
    user.liquor_my(page, size, status).then((data) => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
         history.push("/")
      }
      // console.log(data)
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
      sell:v.v,
      id:v.id
    })
  }
  oNclose(v) {
    if (v == 1) {
      this.setState({
        type: 0,
        mobel: 0,
      })
      return
    } else {
      this.setState({
        type: 0
      })
    }
  }
  oninputs(v, e) {
    e.target.value = ""
  }

  oninput(v, e) {
    // 每次聚焦的 v值  
    // 输入框输入参数后，聚焦下一个输入框
    var p1 = this.refs.p1
    var p2 = this.refs.p2
    var p3 = this.refs.p3
    var p4 = this.refs.p4
    var p5 = this.refs.p5
    var p6 = this.refs.p6
    var input_focus = [p1, p2, p3, p4, p5, p6]
    if (v && v <= 6) {
      if (v == 6) {
        this.setState({
          onBlur: true
        })
        if (p6.value > 1) {
          return p6.value = p6.value.slice(0, 1)
        }
        return
      } else {
        if (v == 7) {
          input_focus[v].focus(false);
          return
        } else {
          input_focus[v].focus();
        }
      }
    }
  }
  tijiao(a, b) {
    const { history } = this.props
    var { cont, type, shop_details,id ,sell} = this.state
    var _this = this.props
    var p1 = this.refs.p1
    var p2 = this.refs.p2
    var p3 = this.refs.p3
    var p4 = this.refs.p4
    var p5 = this.refs.p5
    var p6 = this.refs.p6
    var pawd = [p1, p2, p3, p4, p5, p6]
    if (a == 1) {
      //  清空输入
      for (var i = 0; i < pawd.length; i++) {
        pawd[i].value = null
      }
      Toast.success("输入已置空");
    } else {
      var input_focus = function () {
        return (p1.value + p2.value + p3.value + p4.value + p5.value + p6.value)
      }
      this.state.userpawrd = input_focus()
      var bodys = {
        pwd: parseInt(this.state.userpawrd),
        id: sell.id
      }
      if (id == 1) {
        if (input_focus().length < 3 || input_focus() == '') {
          Toast.info("密码错误,或长度不足");
          return
        }       
        Toast.info("正在出售请稍后...",0);
        user.liquor_sell(bodys).then(data => {
          if (data.code == 4) {
            Toast.info(data.msg, 1)
            store.remove("user_infos")
             history.push("/")
          }
          if (data.code == 1) {
            Toast.info(data.msg)
               this.setState({
                 type:0
               })
          } else {
            Toast.info(data.msg)
          }
        })
      } else {
        var body={
           name:this.refs.name.value,
           mobel:this.refs.mobel.value,
           id:sell.id,
           dz:this.refs.dz.value
        }
        if(body.name==""){
          Toast.info("请输入收货人...");
          return 
        }
        if(body.mobel==""){
          Toast.info("请输入手机号...");
          return 
        }
        if(body.dz==""){
          Toast.info("请输入详细地址...");
          return 
        }
        Toast.info("正在提货请稍后...",0);
        user.liquor_tGood(body).then(data => {
          if (data.code == 4) {
            Toast.info(data.msg, 1)
            store.remove("user_infos")
             history.push("/")
          }
          if (data.code == 1) {
            Toast.info(data.msg)
            this.setState({
              type:0
            })
          } else {
            Toast.info(data.msg)
          }
        })
      }
    }
  }
  confirm_ids(v) {
    const { history } = this.props
    if(v.status==5){
      user.confirm_ids(v.id).then(data => {
        if (data.code == 4) {
          Toast.info(data.msg, 1)
          store.remove("user_infos")
           history.push("/")
        }
        if (data.code == 1) {
          Toast.info(data.msg)
        } else {
          Toast.info(data.msg)
        }
      })
    }

  }

  times(e){
    var down_time=new Date(e)
    return down_time.getDate()
  }

  render() {
    const { history } = this.props
    const { class_list, shop_buy_list, type,sell } = this.state
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
          藏酒-购买历史
        </div>
        <div className="Buy" style={{ top: ".8rem", position: "relative" }}  >
          <div className="class_list" style={{ position: "fixed", width: "100%", backgroundColor: "#fff", zIndex: "1" }}>
            <ul>
              <li className={class_list == 1 ? "on" : ""} onClick={this.class_list.bind(this, 1)}>全部</li>
              <li className={class_list == 2 ? "on" : ""} onClick={this.class_list.bind(this, 2)} >收藏中</li>
              <li className={class_list == 3 ? "on" : ""} onClick={this.class_list.bind(this, 3)}>提货 </li>
              <li className={class_list == 4 ? "on" : ""} onClick={this.class_list.bind(this, 4)}>委托出售</li>
              <li className={class_list == 5 ? "on" : ""} onClick={this.class_list.bind(this, 5)}>已到期</li>
            </ul>
          </div>
          <ul style={{ position: "relative", top: "1rem", backgroundColor: "#fff",overflowX:"hidden" }}>
            {shop_buy_list.map((v, k) => {
              return (
                <li key={k}>
                  {/* <div className="Brew-footer hader " >
                    <span>
                      订单编号：{v.orderid}
                    </span>
                  </div> */}
                  <div>
                    <img src={fetchs.APIHost + v.pd_pic_roll[0]} style={{ height: "1.8rem", width: "1.8rem" }} />
                    <div style={{ lineHeight: "1.5", padding: "0", paddingLeft: "10%" }}>
                      <p>{v.pro.name}</p>
                      <p>规格:{v.pro.pd_unit}</p>
                      <p>价格:{v.pro.price}</p>
                      <p> 生成时间：{ v.status==1|| v.status==2|| v.status==3?v.updated_time:v.created_time}</p>
                      <p>冻结天数：{v.dj_day}</p>
                      <p>还有  <span style={{color:'red',fontWeight:"600",fontSize:".34rem"}}>{v.deadline }</span> 天结束</p>
                    </div>
                  </div>
                  <div className="Brew-footer kd" style={{ display: v.kddh||v.status==6 &&v.status!=6 ? "inline-block" : "none" }}>

                    <div>
                      快递公司：{v.kdlx}
                    </div>
                    <div>
                      快递单号：{v.kddh}
                    </div>
                    {/* 收货 */}
                    <span  style={{display:v.status==6?"none":""}} onClick={this.confirm_ids.bind(this, v)} >{v.status==5?"确认收货":"已完成"} </span>

                  </div>
                  <div className="Brew-footer" style={{ height: ".6rem" }}>
                    <i style={{ float:v.status == -1 ?" ": "left" }}>
                      {v.status == 0 ? <b style={{color:"red"}}>正在收藏</b> : ""}
                      {v.status == -1 ? <b style={{marginRight:".3rem"}}>已到期，请选择:</b> : ""}
                      {v.status == 1 ? <b style={{marginRight:".3rem",color:"red"}}>委托出售中</b> : ""}
                      {v.status == 2 ? "提货中" : ""}
                      {v.status == 3 ? <b style={{marginRight:".3rem",color:"red"}}>委托出售完成</b> : ""}
                      {v.status == 4 ? "提货审核中" : ""}
                      {v.status == 5 ? "已发货" : ""}
                      {v.status == 6 ? "已完成" : ""}
                    </i>
                    {/* 0 正在收藏  -1收藏到期  1委托出售  2提货 3委托出售完成 4 提货完成 */}
                    {v.status == -1 ?
                      <span onClick={this.confirm_id.bind(this, { v, "id": 1 })}>
                        委托出售
                      </span> : ""}
                    {v.status == -1 || v.status == 0 ?
                      <span onClick={this.confirm_id.bind(this, { v, "id": 2 })}>
                        提货
                    </span> : ""}
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="contenter" style={{ display: type >= 1 ? "block" : "none" }}>
            <div className=" loser" style={{ display: type ==2 ? "block" : "none" }}>
              <div className="contenters">
                <div style={{position:"relative"}}>提货 <span className="close">  <img onClick={this.oNclose.bind(this, 2)} src={close} alt="" /></span></div>
                <div className="user-res-input pwd" style={{ width: "100%", borderRadius: 0, top: ".8rem" }}>
                  <div className="user-content">
                    <div className="form" >   <span>收货人</span> <input type="text" ref="name"  placeholder="收货人" /> </div>
                    <div className="form" >   <span>电话</span>  <input type="number" ref="mobel"  placeholder="电话"/></div>
                    <div className="form" >   <span>详细地址</span> <input type="text" ref="dz"  placeholder="详细地址"/>    </div>
                  </div>
                </div>
                <span className="subm" onClick={this.tijiao.bind(this, 111)} > 确认</span>
              </div>
            </div>
            <div className=" loser" style={{ display: type == 1 ? "block" : "none" }}>
              <div className="contenters">
                <div style={{position:"relative"}}>商品出售 <span className="close">  <img onClick={this.oNclose.bind(this, 2)} src={close} alt="" /></span></div>
                <div className="user-res-input pwd" style={{ width: "100%", borderRadius: 0, top: ".8rem" }}>
                  <div className="user-content">
                    <div className="form" >   <span>名称</span>  <p>{sell.name}</p>  </div>
                    <div className="form" >   <span>价格</span> <p style={{color:"red"}}>{ parseInt(sell.price)+( parseInt(sell.price)  * parseInt(sell.rate))/100}QDB</p> </div>
                    {/* <div className="form" >   <span>订单号</span>    </div> */}
                  </div>
                </div>
                <div className="cont_in">
                  <p style={{marginBottom:".2rem"}}>请输入密码</p>
                  <input type="number" autoFocus ref="p1" onFocus={this.oninputs.bind(this, 1)} maxLength="1" autoFocus onChange={this.oninput.bind(this, 1)} />
                  <input type="number" ref="p2" onFocus={this.oninputs.bind(this, 2)} maxLength="1" onChange={this.oninput.bind(this, 2)} />
                  <input type="number" ref="p3" onFocus={this.oninputs.bind(this, 3)} maxLength="1" onChange={this.oninput.bind(this, 3)} />
                  <input type="number" ref="p4" onFocus={this.oninputs.bind(this, 4)} maxLength="1" onChange={this.oninput.bind(this, 4)} />
                  <input type="number" ref="p5" onFocus={this.oninputs.bind(this, 5)} maxLength="1" onChange={this.oninput.bind(this, 5)} />
                  <input type="number" ref="p6" onFocus={this.oninputs.bind(this, 6)} maxLength="1" onChange={this.oninput.bind(this, 6)} />
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
