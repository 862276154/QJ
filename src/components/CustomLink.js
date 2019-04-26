import React, { Component } from 'react';
import { Carousel, Toast } from 'antd-mobile';
import { Router, Route, Switch, routerRedux, Link } from 'dva/router';
import "../public/css/index.css"
import '../public/css/home.css'
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import logo from '../public/img/login.png'
//search  Sign_in
import search from '../public/img/search.png'
import Sign_in from '../public/img/Sign_in.png'
import right from '../public/img/whrtiht-left.png'
import shop from '../public/img/jiuf.png'
import shop1 from '../public/img/f1 (1).png'
import shop2 from '../public/img/f1 (2).png'
import shop3 from '../public/img/f1 (3).png'
// const AgreeItem = Checkbox.AgreeItem;
import shopshow from '../public/img/首页_38.png'
var queryString = require('querystring');
class CustomLink extends Component {
    state = {
        data: [],
        imgHeight: "4.18rem",
        fenlei: ["1", "2", "3", "4"],
        fenlei_list: ["1", "2", "3", "4"],
        type: "",
        img_data: [],
        list_class: []

    }
    componentDidMount() {
        var { location } = this.props
        location.search = location.search.replace("?", "")
        const parsed = queryString.parse(location.search);
        this.setState({
            type: parsed.shop_type,
        })
        user.getShopclass().then(data => {
            if (data.code == 1) {
                this.setState({
                    list_class: data.data
                })
            }
        })
        user.CustomLink().then(data => {
            //   console.log(data)
            if (data.code == 1) {
                this.setState({
                    fenlei_list: data.data ? data.data : ""
                })
            }
        })
        user.product_title4().then(data => {
            // console.log(data)
            // return
            if (data.code == 1) {
                this.setState({
                    img_data: data.data
                })
            }
        })
        setTimeout(() => {
            this.setState({
                data: this.state.data,
            });
        }, 100);
    }
    details(v) {
        const { history } = this.props
        const { type } = this.state
        // return
        if (type == 2) {
            history.push(`/details_c?id=${v}&type=${type}`)
        } else {
            history.push(`/details?id=${v}&type=${type}`)
        }
    }
    async open_shop() {
        const { history } = this.props
        await user.merchant().then(data => {
            // console.log(data)
            if (data.code == 0) {
                if (data.msg == "审核已通过") {
                    history.push("/sub_goods")
                } else {
                    Toast.info(data.msg)
                }
            } else {
                history.push("/Storeapplication")
            }
        })
    }
    open_http(v){
        window.open(v)
    }
    render() {
        const { history } = this.props
        const { lunber, fenlei, fenlei_list, type, list_class } = this.state
        return (
            <div className="res home">
                <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff" }}>
                    <img src={right} onClick={() => history.go(-1)} />
                    {"合作"}
                </div>
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

                <Carousel autoplay={false}
                    style={{ position: "relative", zIndex: 1, paddingTop: "0.83rem" }}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                >
                    {this.state.img_data.map(val => (
                        <a
                            href={val.lianjie}
                            key={val}
                            // href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: "4.18rem" }}
                        >
                            <img
                                src={fetchs.APIHost + val.pic_name}
                                alt=""
                                style={{ width: '100%', height: this.state.imgHeight, verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: this.state.imgHeight });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                <div style={{ display: type == 1 ? "" : "none" }}>
                    <div className="home ">
                        <ul className="ul">
                            <li onClick={() => history.push("/BuyBrew")}>
                                <img src={shop} alt="" />
                                <p>酿酒坊</p>
                            </li>
                            {list_class.map((v, k) => {
                                return (
                                    <li key={k} onClick={() => history.push(`/shopList?type=${v.id}&name=${v.cate_name}`)}>
                                        <img src={fetchs.APIHost + v.image} alt="" />
                                        <p>{v.cate_name}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="shop-title" style={{ position: "relative" }} >
                    <div style={{ textAlign: "left" }}>
                        <span className="remind">
                            猜你喜欢
                        </span>
                    </div>
                </div>
                <div className="shop shop-list" style={{ padding: 0 }}>
                    <ul className="">
                        {
                            fenlei_list.map((v, k) => {
                                return (
                                    <li key={k} >
                                        <div>
                                            <div onClick={this.open_http.bind(this,v.href)} >
                                                <p><img style={{ minWidth: "2rem", minHeight: "2rem" }} src={v.image ? fetchs.APIHost + v.image : logo} alt="" /></p>
                                                <p> {v.button}</p>
                                            </div>
                                            {/* <a href={v.href}>
                                          
                                            </a> */}
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default CustomLink;
