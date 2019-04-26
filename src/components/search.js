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
import right from '../public/img/left.png'
import shop from '../public/img/jiuf.png'
import shop1 from '../public/img/f1 (1).png'
import shop2 from '../public/img/f1 (2).png'
import shop3 from '../public/img/f1 (3).png'
// const AgreeItem = Checkbox.AgreeItem;
import shopshow from '../public/img/首页_38.png'
var queryString = require('querystring');
var store =require("store")
class Shop extends Component {
    state = {
        data: [],
        imgHeight: "4.18rem",
        fenlei: ["1", "2", "3", "4"],
        fenlei_list: [],
        type: "",
        img_data: [],
        list_class: [],

    }
    componentDidMount() {
        var { location } = this.props
        const { history } = this.props
        location.search = location.search.replace("?", "")
        const parsed = queryString.parse(location.search);
        // console.log(parsed.shop_type)
        this.setState({
            type: parsed.shop_type,
        })


        // 搜索
        var page = 1, size = 10, type = parsed.shop_type
        if (type) {
            this.refs.search.value = type
            this.search(type)
        }
        //  轮播
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
    searchs() {
        var type = this.refs.search.value
        if (type) {
            this.liquors_keywords(type)
        }
    }
    search(type) {
        if (type) {
            this.liquors_keywords(type)
        }
    }
    liquors_keywords(type) {
        const { history } = this.props
        history.push(`search?shop_type=${type}`)
        user.liquors_keywords(type).then(data => {
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


    render() {
        const { history } = this.props
        const { lunber, fenlei, fenlei_list, type, list_class } = this.state
        const app = this
        return (
            <div className="res home">
                <div className="res-hader" style={{ position: "absolute", width: "100%" }}>
                    <img src={right} onClick={() => history.go(-1)} />
                    <div className="content-search">
                        <img className="search-img" src={search} onClick={this.searchs.bind(this)} alt="" />
                        <input type="text" className="search" ref="search" />
                    </div>

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


                <div style={{position:'relative',top:".8rem"}} >
                    <div className="shop-title">
                        <div style={{ textAlign: "left" }}>
                            <span className="remind">
                                我的搜素
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
                                                <img src={fetchs.APIHost + v.toutu} alt="" />
                                                <div>
                                                    <p> {v.pd_name ? v.pd_name : v.name}</p>
                                                    <p>￥<span>{v.pd_qdb ? v.pd_qdb : v.price}</span></p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>

        );
    }
}

export default Shop;
