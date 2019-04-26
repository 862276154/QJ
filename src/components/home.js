import React, { Component } from 'react';
import { List, Checkbox, Flex, Carousel, Toast } from 'antd-mobile';
import { Router, Route, Switch, routerRedux, Link } from 'dva/router';

import "../public/css/index.css"
import '../public/css/home.css'
import '../public/css/Brew.css'
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import logo from '../public/img/login.png'
import search from '../public/img/search.png'
import Sign_in from '../public/img/Sign_ins.png'
import right from '../public/img/whrtiht-left.png'
import shop from '../public/img/首页_17.png'
import shop1 from '../public/img/首页_19.png'
import shop2 from '../public/img/首页_22.png'
import shop3 from '../public/img/首页_25.png'
import close from '../public/img/close.png'
import news from '../public/img/news.png'
var store = require('store');
class Home extends Component {
  state = {
    img_data: [],
    imgHeight: "4.18rem",
    gonggao: [],
    get_shop_list: ["1", "2", "3", "4"],
    type: 0,
    gonggaos: "",
    CustomLink: "",
    news: [],
    num: 0,
    news_data: []
  }
  componentDidMount() {
    const { history } = this.props
    var log = store.get("log")
    this.setState({
      log: log
    })

    user.banner().then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      if (data.code == 1) {
        this.setState({
          img_data: data.data
        })
      }
      user.notice().then(data => {
        if (data.code == 4) {
          Toast.info(data.msg, 1)
          store.remove("user_infos")
          history.push("/")
        }
        if (data.code == 1) {
          this.setState({
            gonggao: data.data ? data.data : ""
          })
          if (store.get("type") != 0) {
            this.setState({
              type: 1
            })
          }

        }
      })
      user.notices().then(data => {
        // console.log(data)
        if (data.code == 4) {
          Toast.info(data.msg, 1)
          store.remove("user_infos")
          history.push("/")
        }
        if (data.code == 1) {
          this.setState({
            gonggaos: data.data ? data.data : ""
          })
        }
      })
    
    

    })
    setTimeout(() => {
      this.setState({
        data: this.state.data,
      });
    }, 100);

    this.news_list()

  }

  async news_list() {
    const { history } = this.props
    user.zx_cate().then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      // console.log(data)
      if (data.code == 1) {
        this.setState({
          news: data.data
        })
        Toast.info("加载中...", 1)
        user.zx_list(data.data[0].id).then(data => {
          if (data.code == 4) {
            Toast.info(data.msg, 1)
            store.remove("user_infos")
            history.push("/")
          }
          // console.log(data)
          this.setState({
            news_data: data.data
          })
        })
      }
    })
  }

  img_s(e) {
    var APIHost = fetchs.APIHost
    // console.log(e)
    // return
    if (typeof e == "string") {
      let str = e.replace(/\/uploads/g, APIHost + '/uploads')
      // console.log(html)
      var imgReg = /<img.*?(?:>|\/>)/gi;
      var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      var arr = str.match(imgReg);  // arr 为包含所有img标签的数组
      // console.log(typeof  arr)
      if(arr !=null){
        return arr[0]
      }else{
        return  `<img src=${news} alt="图挂了" />`
      }
    } else {
      // <img src={shop3} alt="" />
      return ""
    }
  }
  oNclose(v) {
    this.setState({
      type: 0
    })
    store.set("type", 0)
  }
  details(v) {
    const { history } = this.props
    history.push(`/details?id=${v}`)
  }
  get_img(v) {
    if (typeof v == Array)
      return v[0]
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


  search() {
    const { history } = this.props
    var search = this.refs.search.value
    if (!search) {
      Toast.info("写点啥呢？")
      return
    }
    history.push(`/search?shop_type=${search}`)
  }
  on_news_list(e) {
    console.log(e[1])
    this.setState({ num: e[1]});
    Toast.info("加载中...", 1)
    user.zx_list(e[0].id).then(data => {
      // console.log(data)
      this.setState({
        news_data: data.data
      })
    })
  }
  render() {
    const { history } = this.props
    const { lunber, gonggao, get_shop_list, type, gonggaos, log, news, news_data } = this.state
    return (
      <div className="res home">
        <style>
          {`
            .close {
              position: fixed !important;
              right: 10% !important;
              top:12% !important;
            } 
            .user-content{
              text-align: initial;
            }
            .form div p {
              font-size: .26rem !important;
            }
         `}
        </style>
        <div className="res-hader" style={{ position: "absolute", width: "100%" }}>
          <img src={log ? fetchs.APIHost + log : logo} />
          <div className="content-search">
            <img className="search-img" src={search} onClick={this.search.bind(this)} alt="221" />
            <input type="text" ref="search" className="search" />
          </div>
          <img onClick={() => history.push("/Sign")} className="search-img Sign-in" src={Sign_in} alt="" />
        </div>
        <Carousel autoplay={false}
          style={{ position: "relative", zIndex: 1 }}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.img_data.map(val => (
            <a
              href={val.lianjie}
              key={val}
              // href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={fetchs.APIHost + val.pic_name}
                alt=""
                style={{ width: '100%', height: "100%", verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: this.state.imgHeight });
                }}
              />
            </a>
          ))}
        </Carousel>
        <div>
          <div className="home ">
            <ul className="ul">

              <li onClick={() => history.push("/shop?shop_type=1")}>
                <img src={shop} alt="" />
                <p>商城</p>

              </li>
              <li onClick={() => history.push("/shop?shop_type=2")}>
                <img src={shop1} alt="" />
                <p>藏酒</p>
              </li>
              <li onClick={() => history.push("/shop?shop_type=3")}>
                <img src={shop2} alt="" />
                <p>活动</p>
              </li>
              <li onClick={() => history.push("/CustomLink?shop_type=4")}>
                <img src={shop3} alt="" />
                <p>合作</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="Notice">
          <ul className="Notice ul" style={{ backgroundColor: "#ffffff", padding: "0 .2rem" }}>
            <span >官方 <b className="gog" ></b></span>
            <marquee style={{ fontWeight: "bold", color: "#333", fontSize: ".3rem", lineHeight: " .8rem", padding: "2px 5px" }}>
              {gonggao.n_title ? gonggao.n_title : ""}  {gonggao.n_message ? gonggao.n_message : ""}
            </marquee>
          </ul>
        </div>
        <div className="shop-list">
          <ul className="news-ui">
            {news.map((v, k) => {
              return (
                <li className={this.state.num == k ? "active" : ""} onClick={this.on_news_list.bind(this,[v,k])} key={k}>{v.cate_name}</li>
              )
            })}
          </ul>
          
          <ul className="shop-list-ui">

            {news_data.map((v, k) => {
              return (
                <li key={k} onClick={()=>history.push(`/news?zx_id=${v.id}`)} >
                  <div >
                    <p className="shop_name">{v.title}</p>
                    <p><span>{v.created_time}</span></p>
                  </div>

                  <div dangerouslySetInnerHTML={{ __html: this.img_s(v.message) }}></div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="Popup" style={{ display: type == 1 ? "block" : "none" }}>
          <div className="contenter " style={{ top: 0, bottom: 0, left: 0, right: 0 }} >
            <div className=" loser" >
              <div className="contenters homes" style={{ top: "10%" }}>
                <span className="close">  <img onClick={this.oNclose.bind(this, 2)} src={close} alt="" /></span>
                <div style={{ position: "relative", width: "80%", margin: "0 auto" }}> {gonggaos.title} </div>
                <div className="user-res-input pwd" style={{ width: "100%", borderRadius: 0, top: ".8rem" }}>
                  <div className="user-content" >
                    <div className="form" >
                      <div dangerouslySetInnerHTML={{ __html: this.replaces(gonggaos.content) }}>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <span className="subm" onClick={this.tijiao.bind(this, 111)} > 确认</span> */}
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default Home;
