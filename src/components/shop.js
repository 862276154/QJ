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
var store = require("store")
var queryString = require('querystring');
class Shop extends Component {
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
        const { history } = this.props
        location.search = location.search.replace("?", "")
        const parsed = queryString.parse(location.search);
        // console.log(parsed.shop_type)
        this.setState({
            type: parsed.shop_type,
            // goods_id: parsed.id

        })
        user.getShopclass().then(data => {
            if (data.code == 4) {
                Toast.info(data.msg, 1)
                store.remove("user_infos")
                history.push("/")
            }
            // console.log(data.data)
            if (data.code == 1) {
                this.setState({
                    list_class: data.data
                })
            }
        })
        var page = 1, size = 10, type = parsed.shop_type
        if (type == 2) {
            // liquor
            user.liquor(page, size).then(data => {
                if (data.code == 4) {
                    Toast.info(data.msg, 1)
                    store.remove("user_infos")
                    history.push("/")
                }
                // console.log(data.data.data)
                if (data.code == 1) {
                    this.setState({
                        fenlei_list: data.data.data ? data.data.data : ""
                    })
                }
            })
            user.getShopClass(page, size, type).then(data => {
                if (data.code == 4) {
                    Toast.info(data.msg, 1)
                    store.remove("user_infos")
                    history.push("/")
                }
                // console.log(data.data.data)
                // if (data.code == 1) {
                //     this.setState({
                //         fenlei_list: data.data.data ? data.data.data : ""
                //     })
                // }
            })
        } else {
            user.getShopClass(page, size, type).then(data => {
                if (data.code == 4) {
                    Toast.info(data.msg, 1)
                    store.remove("user_infos")
                    history.push("/")
                }
                // console.log(data.data.data)
                if (data.code == 1) {
                    this.setState({
                        fenlei_list: data.data.data ? data.data.data : ""
                    })
                }
            })

        }

        if (parsed.shop_type == 2) {
            user.product_title1().then(data => {
                if (data.code == 4) {
                    Toast.info(data.msg, 1)
                    store.remove("user_infos")
                    history.push("/")
                }
                console.log(data)
                // return
                if (data.code == 1) {
                    this.setState({
                        img_data: data.data
                    })
                }


            })
        } else if (parsed.shop_type == 3) {
            user.product_title3().then(data => {
                if (data.code == 4) {
                    Toast.info(data.msg, 1)
                    store.remove("user_infos")
                    history.push("/")
                }
                console.log(data)
                // return
                if (data.code == 1) {
                    this.setState({
                        img_data: data.data
                    })
                }


            })
        } else {
            user.product_title().then(data => {
                if (data.code == 4) {
                    Toast.info(data.msg, 1)
                    store.remove("user_infos")
                    history.push("/")
                }
                // console.log(data)
                // return
                if (data.code == 1) {
                    this.setState({
                        img_data: data.data
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
            } else if (data.code == 1) {
                history.push("/Storeapplication")
            }
        })
    }

    to_num(e) {
        var num = parseInt(e)
        // console.log(num)
        if (e) return num.toFixed(0)

    }

    render() {
        const { history } = this.props
        const { lunber, fenlei, fenlei_list, type, list_class } = this.state
        const app = this
        // console.log(fenlei_list)
        return (
            <div className="res home">
                <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff" }}>
                    <img src={right} onClick={() => history.go(-1)} />
                    {type == 1 ? "商城" : ""}
                    {type == 2 ? "藏酒" : ""}
                    {type == 3 ? "活动" : ""}

                    <span className="open-shop" onClick={this.open_shop.bind(this)} style={{ display: type == 1 ? "block" : "none" }}>
                        开店
                    </span>
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
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={fetchs.APIHost + val.pic_name}
                                alt=""
                                style={{ width: '100%', height:this.state.imgHeight , verticalAlign: 'top' }}
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
                <div className="shop-title">
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
                                    <li key={k} onClick={this.details.bind(this, v.id)} >
                                        <div>
                                            <div style={{ height: "2.3rem" }}>  <img src={fetchs.APIHost + v.toutu} alt="" /></div>
                                            <div>
                                                <p> {v.pd_name ? v.pd_name : v.name}</p>
                                                <p style={{ display: v.pd_sendnl ? "" : "" }}>
                                                    <span  >{v.deadline ? "收藏期限" : "酿力+"} </span>
                                                    {v.deadline ?
                                                        <span   >{v.deadline}天</span> : this.to_num(v.pd_sendnl)}
                                                </p>
                                                 <p style={{display:v.pd_qdb != 0?"":"none"}} ><i >￥</i><span>{ v.pd_qdb? v.pd_qdb: v.price}QDB </span></p>
                                                <p  style={{display: v.pd_qj&&v.pd_qj != 0?"":"none",textAlign:"right",color:"#f08e2d" }} ><i >￥</i><span>{ v.pd_qj ? v.pd_qj : 0}QJ</span></p>
                                            </div>
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

export default Shop;
