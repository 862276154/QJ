import React, { Component } from 'react';
import { List, Checkbox, Flex, Carousel, Toast } from 'antd-mobile';
import { Router, Route, Switch, routerRedux, Link } from 'dva/router';
import "../public/css/index.css"
import '../public/css/home.css'
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import close from '../public/img/close.png'
import search from '../public/img/search.png'
import Sign_in from '../public/img/Sign_in.png'
import right from '../public/img/left.png'
import shop from '../public/img/shop.jpg'
import shopshow from '../public/img/首页_38.png'
var queryString = require('querystring');
// const AgreeItem = Checkbox.AgreeItem;

class details_c extends Component {
  state = {
    img_data: [],
    imgHeight: "4.18rem",
    gonggao: [],
    get_shop_list: ["1", "2", "3", "4"],
    shop_details: "",
    cont: 1,
    mobel: false,
    type: 0,
    disabled: true
  }
  componentDidMount() {
    var { location } = this.props
    location.search = location.search.replace("?", "")
    const parsed = queryString.parse(location.search);
    // console.log(parsed)
    var id = parsed.id
    if (parsed.type == 2) {
      user.liquors(id).then(data => {
        // console.log(data)
        // return
        if (data.code == 1) {
          this.setState({
            shop_details: data.data.data[0] ? data.data.data[0] : "",
            img_data: data.data.data[0].ls_roll ? data.data.data[0].ls_roll : ""
          })
        }
      })
    } else {
      user.getShop(id).then(data => {
        // console.log(data.data)
        // return
        if (data.code == 1) {
          this.setState({
            shop_details: data.data.data[0] ? data.data.data[0] : "",
            img_data: data.data.data[0].pd_pic ? data.data.data[0].pd_pic : ""
          })
        }
      })
    }


    setTimeout(() => {
      this.setState({
        data: this.state.data,
      });
    }, 100);
  }
  res() {
    const { Checkbox } = this.state
    // const Checkbox=this.state.Checkbox
    // console.log(Checkbox)
  }

  replaces(v) {
    // console.log(v)
    // return;
    if (v) {
      var APIHost = fetchs.APIHost
      let html = v.replace(/\/uploads/g, APIHost + '/uploads')
      // console.log(html)
      return html
    }

  }
  cont(v) {
    // console.log(v)
    if (v == 1) {
      var cont = this.state.cont;
      cont--
      if (cont < 1) {
        return
      }
      this.setState({
        cont: cont
      })
    } else {
      var cont = this.state.cont;
      cont++
      this.setState({
        cont: cont
      })
    }
  }

  buys(v) {
    // console.log(v)
    const type = this.state.type
    const mobel = this.state.mobel

    this.setState({
      mobel: v,
      // type: 0
    })
  }
  buys1(v) {
    // console.log(v)
    const type = this.state.type
    const mobel = this.state.mobel

    this.setState({
      // mobel: v,
      type: v
    })
  }
  oNclose(v) {
    // console.log(v)
    var type = this.state.type
    // console.log(type)
    if (v == 1) {
      this.setState({
        type: 0,
        mobel: 0,
      })
      return
    } else {
      this.setState({
        // mobel:1,
        type: 0
      })
    }

  }

  oninputs(v, e) {
    // 清空输入
    // if(v==1){
    //   return 
    // }
    e.target.value = ""

  }

  oninput(v) {
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
      // console.log(v==6)
      // input_focus[1].focus();
      if (v == 6) {
        if (p6.value > 1) {
          return p6.value = p6.value.slice(0, 1)
        }
      } else {
        if (v == 6) {
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
    var { cont, type, shop_details } = this.state
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
      if (input_focus().length < 3 || input_focus() == '') {
        Toast.info("密码错误,或长度不足");
        return
      } else {
        this.state.userpawrd = input_focus()
        var bodys = {
          num: cont,
          pwd: parseInt(this.state.userpawrd),
          id: shop_details.id
        }
        // console.log(bodys)

        Toast.info("正在购买请稍后...");
        this.setState({
          disabled: false
        })
        if (this.state.disabled === false) return
        user.liquor_buy(bodys).then(data => {
          if (data) {
            this.setState({
              disabled: true
            })
          }
          if (data.code == 1) {
            Toast.success(data.msg)
            this.setState({
              type: 1
            })
            for (var i = 0; i < pawd.length; i++) {
              pawd[i].value = null
            }
            history.push("/history")
          } else if (data.code == 4) {
            Toast.info(data.msg)
          } else if (data.code == -1) {
            Toast.info(data.msg)
            history.push("/user_info")

          } else {
            Toast.info(data.msg)
          }
        })
      }
    }
  }
  render() {
    const { history } = this.props
    const { shop_details, img_data, cont, mobel, type } = this.state
    // console.log(`mobel` + mobel, `type` + type)
    const app = this
    return (
      <div className="res home">
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
        <div className="res-hader" style={{ position: "absolute", width: "100%" }}>
          <img src={right} onClick={() => history.go(-1)} />

        </div>
        <Carousel autoplay={false}
          style={{ position: "relative", zIndex: 1, borderBottom: "1px solid #ccc", paddingBottom: ".1rem" }}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}

        >
          {img_data.map(val => (
            <a
              href={val.lianjie}
              key={val}
              // href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={fetchs.APIHost + val}
                alt=""
                style={{ height: "4.18rem", width: "100%", verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: this.state.imgHeight });
                }}
              />
            </a>
          ))}
        </Carousel>
        <div className="shop-list shop_details">
          <div className="shop_details_titel">
            <div>
              <p style={{ color: "#3F3D3D" }}>{shop_details.name}</p>
              <p>￥<span style={{ color: "#FEA03C" }}>{shop_details.price}</span>QDB</p>
              <p>增值比例<span style={{ color: "#FEA03C" }} >{shop_details.zz_rate} % </span></p>
              <p >藏酒期限<span style={{ color: "#FEA03C" }}>{shop_details.deadline}天</span></p>
              <p>赠送酿力<span style={{ color: "#FEA03C" }} >{shop_details.pd_sendnl}</span></p>
              {/* <p style={{ color: "#3F3D3D" }}>{shop_details.pd_name}</p> */}
            </div>
          </div>
          <div className="shop_text">
            <p>
              商品详情
            </p>
            <div dangerouslySetInnerHTML={{ __html: this.replaces(shop_details.pd_detail) }}></div>
          </div>
        </div>
        <div className="footer" >
          <button onClick={this.buys.bind(this, !mobel ? 1 : 1)}>收藏</button>
          {/* <button onClick={this.buys.bind(this, !mobel ? 2 : 2)}>QJ换购</button> */}
        </div>
        <div className="Popup" style={{ display: mobel >= 1 ? "block" : "" }}>
          <div className="contenter">
            <div className="div_img">
              <img src={fetchs.APIHost + shop_details.toutu} alt="" />
            </div>
            <div className="contenter-text">
              <span >
                <img onClick={this.oNclose.bind(this, 1)} src={close} alt="" />
              </span>
              <div className="head">
                <p style={{ color: "#FB4440" }}>￥{(cont * shop_details.price).toFixed(2)} </p>
                <p>单价{shop_details.price}</p>
                <p>已选:{cont}</p>
              </div>
            </div>
            <div className="cont">
              <p>数量</p>
              <div>
                <span onClick={this.cont.bind(this, 1)} className="jian">-</span>
                <span style={{ width: "1rem" }}>{cont}</span>
                <span onClick={this.cont.bind(this, 2)} className="jia">+</span>
              </div>
            </div>
            <div className="footer" >
              <button onClick={this.buys1.bind(this, !mobel ? 1 : 1)}>收藏</button>
              {/* <button onClick={this.buys1.bind(this, !mobel ? 2 : 2)}>QJ换购</button> */}
            </div>
            <div className="loser" style={{ display: type >= 1 ? "block" : "none" }} >
              <div className="contenters">
                <div>输入交易密码 <span className="close">  <img onClick={this.oNclose.bind(this, 2)} src={close} alt="" /></span></div>
                <div className="cont_in">
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

export default details_c;
