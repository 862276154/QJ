import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast } from 'antd-mobile';
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import '../public/css/App.css'
import '../public/css/sign.css'
import right from '../public/img/whrtiht-left.png'
// qiandao_bottom
// const AgreeItem = Checkbox.AgreeItem;
import qiandao_bottom from '../public/img/qiandao_bottom.png'
// import { isArray } from 'util';
var store = require('store');
class sign extends Component {
  state = {
    codeimg: "",
    conYzm: "",
    Checkbox: false,
    yueD: "",
    days: [],
    setZhou: "",
    tian: "",
    day: 0,
    setTian: ""
  }
  res() {
    const { Checkbox } = this.state
    // const Checkbox=this.state.Checkbox
    // console.log(Checkbox)
  }

  async  componentDidMount() {
    const { history } = this.props
    const {days}=this.state
    // this.max_arr()
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
        var user_info = data.data
        if (data.code == 1) {
          store.set("user_info", user_info)
        }
        if (user_info) {
          this.setState({
            user_info: user_info,
          })
        }
      })
    }
    var user_info = store.get("user_info")
    if (user_info) {
      this.setState({
        user_info: user_info
      })
      if (user_info.qiandao == 1)
        this.setState({
          day: 1
        })
    }
    this.sigin()

    // console.log(days)
  }
  async  Sign_post() {

    const { history } = this.props
    Toast.info("签到中")
    await user.Sign_post().then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
   
      if (data.code == 1) {
        this.setState({
          day: 1
        })
      } else {
        Toast.info(data.msg, 1)
      }
      this.sigin()
    })
  }
  async sigin() {
    const { history } = this.props
    var dat = new Date(); //当前时间 


    var nian = dat.getFullYear();//当前年份 
    // 区分一下参数 
    var yue = dat.getMonth(); //当前月 
    this.setState({
      yueD: yue
    })
    var tian = dat.getDate(); //当前天 
    // var tianD = dat.getDate();
    var setDat = new Date(nian, yue + 1, 1 - 1); //把时间设为下个月的1号 然后天数减去1 就可以得到 当前月的最后一天; 
    // console.log(setDat)
    var setTian = setDat.getDate(); //获取 当前月最后一天 
    // console.log(setTian)
    var setZhou = new Date(nian, yue, 1).getDay(); //获取当前月第一天 是 周几 
    // console.log(setZhou)
    var days = []
    for (var i = 0; i < setZhou; i++) {
      days.push([i] == "")

    }
    var sgin = {}
    await user.Sign().then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      // console.log(data)
      return sgin = data.data

    })
    // console.log(sgin.length)
    // console.log(setTian)
    for (var i = 1; i <= setTian+setZhou; i++) {
      days.push([i])
      // console.log(days)
      // console.log(sgin)
      // return

      var day = "day"

      for (day in sgin) {
        if (sgin.hasOwnProperty(day)) {
          // const element = object[key];
          // console.log(sgin[day].day)
          if (days[i] == sgin[day].day)
            days[i] = [days[i], "1"]
        }
      }

    }
    // console.log(days)
    this.setState({
      days: days,
      setZhou: setZhou,
      tian: tian,
      day_length: sgin.length,
      setTian: setZhou + setTian
    })
  }


  render() {
    const { history } = this.props
    const { yueD, days, tian, day_length, day, setTian } = this.state
    // console.log(days)
    // this.max_arr()
    return (
      <div className="res sign">
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
        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff", position: "relative", color: "rgb(68, 4, 29)" }}>
          <img src={right} onClick={() => history.go(-1)} />
          签到
        </div>
        <div className="user-res-input sign-content">
          <div className="sign-title">
            {/* <p style={{fontSize:".48rem"}}>签到提醒</p> */}
            <p>您已签到 <sup>{day_length}</sup> 天</p>
            <p style={{ color: "#ccc", fontSize: ".3rem" }}>坚持下去就会成功！不积跬步无以至千里！</p>
            <button className={day == 1 ? "ok_day" : ""} disabled={day == 1 ? true : false} onClick={this.Sign_post.bind(this)}>{day == 1 ? "今日已签到" : "立即签到"}</button>
          </div>
          <div className="user-content">
            <div >
              <p className="title">{yueD + 1}月签到日历 </p>
              <ul className="title week">

                <li>日</li>

                <li>一</li>

                <li>二</li>

                <li>三</li>

                <li>四</li>

                <li>五</li>

                <li>六</li>
              </ul>
              <ul className="title day">

                {days.map((v, k) => {
                  return (
                    <li key={k} className={v[1] == "1" ? "days" : ""} style={{ visibility: k >= setTian ? "hidden" : "" }} >
                      {v[0]}
                    </li>
                  )
                })}
              </ul>

            </div>

            <img src={qiandao_bottom} />
          </div>

        </div>
        <div className="sign-footer ">
          <p>
            签到说明:
                </p>
          <div>
            <p>
              签到赠送酿力值,每日登录记得来签到  嗷~
          </p>

          </div>
        </div>
      </div>
    );
  }
}

export default sign;
