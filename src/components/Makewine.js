import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Toast } from 'antd-mobile';
// import $ from 'jquery';
import "../public/css/index.css"
import '../public/css/Makewine.css'
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import yulou from '../public/img/yulou.png'
// jiu1
import jiu1 from '../public/img/jiuo.png'
var store = require('store');

// const AgreeItem = Checkbox.AgreeItem;

class Makewine extends Component {
  state = {
    data: ['1'],
    imgHeight: "4.18rem",
    Makewine_bg: "",
    element: [],
    user_info: "",
    datas:[]
  }
  componentDidMount() {
    var Makewine_bg = this.refs.Makewine_bg.offsetWidth
    var Makewine_h = this.refs.Makewine_bg.offsetHeight
    // console.log(Makewine_h)
    this.setState({
      Makewine_bg: Makewine_bg,
      Makewine_h: Makewine_h,
      user_info: store.get("user_info")
    })
    this.Makewine()
    this.hqqj()
  }
  hqqj(){
    user.hqqj().then((data)=>{
      console.log(data)
      if(data.code==1){
        this.setState({
          datas:data.data
        })
      }
    })
  }
  Makewine() {
    const { history } = this.props
    user.qjlist().then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      // console.log(data.data[0].chanliang=="0.00")
      if (data.code == 1) {
        const element = []
        for (const key in data.data) {
          if (data.data.hasOwnProperty(key)) {
            element.push(data.data[key].id)
          }
        }
        this.setState({
          data: data.data,
          element: element
        })
    
      }
    })
  }
  animation(k) {
    // console.log(cont.offset().left)
    var random = Math.random() * k
    // console.log(random*10)
    if (random < k) {
      return random
    } else {
      return random - 200
    }
  }
  Collect() {
    const { history } = this.props
    const { element } = this.state
    // console.log(element)
    var body = {
      ids: element
    }
    user.qjlists(body).then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      // console.log(data)
      if (data.code == 1) {
        Toast.info(data.msg, 3)
        this.Makewine()
        this.hqqj()
      } else {
        Toast.info(data.msg)
      }
    })


  }

  mix() {
    var nmber = 0.1
    var array = []
    var nu = parseInt(nmber / 12, 10)
    if (nu < 0) {
      return
    } else {
      for (let index = 1; index < array; index++) {
        if (nu)
          return
      }
    }
    return
  }
  shouqu(v) {
    const { history } = this.props
    const { element } = this.state
    // console.log(v)
    user.brew_sq({ "id": v }).then(data => {
      Toast.info(data.msg)
      user.qjlist().then(data => {
        if (data.code == 4) {
          Toast.info(data.msg, 1)
          store.remove("user_infos")
          history.push("/")
        }
        // console.log(data.data[0].chanliang=="0.00")
        if (data.code == 1) {
          const element = []
          for (const key in data.data) {
            if (data.data.hasOwnProperty(key)) {
              element.push(data.data[key].id)
            }
          }
          console.log(element,data.data)
          this.setState({
            data: data.data,
            // element: element
          })
          this.hqqj()
        }
      })
    })
  }
  render() {
    const { history } = this.props
    const { data, Makewine_bg, Makewine_h, datas } = this.state
    const app = this
    // console.log(user_info)
    return (
      <div className="Makewine">
        <div className="Makewine-bg" ref="Makewine_bg">
          <img className="House" onClick={() => history.push("/Brew")} src={jiu1} alt="" />
          <div className="House" >
            <p>酿力值:{datas.acc_niangli}</p>
            <p>QJ数量:{datas.acc_qj}</p>
          </div>
          {data.map((v, k) => {
            return (
              <li key={k} onClick={this.shouqu.bind(this, v.id)} style={{ top: this.animation(Makewine_bg - 200), right: this.animation(Makewine_bg - 200) }}>
                <img src={yulou} alt="" />
                <p>{v.chanliang == "0.0000" ? "0.0001" : v.chanliang}</p>
              </li>
            )
          })}
        </div>
        <div className="Explain">
          <div className="Collect-btn">
            <button onClick={() => history.push("/BuyBrew")} >酒坊升级</button><button onClick={this.Collect.bind(this)} >一键收取</button>
          </div>
          <h2>酿酒坊说明 :</h2>
          <p >
            每日凌晨0:00生产 琼浆露( 简称：QJ)。
          </p>
          <p >
            48小时不收取，停止酿造,请尽快收取。
          </p>
          <p>
            获得酿力的方法 实名注册 每日签到 邀请好友 购买酿酒坊（1-5级）
          </p>
        </div>
      </div>
    );
  }
}

export default Makewine;
