import React, { Component } from 'react';
import { List, Checkbox, Flex, Carousel ,Toast} from 'antd-mobile';
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
var store = require('store');
class shopList extends Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: "4.18rem",
        fenlei: ["1", "2", "3", "4"],
        fenlei_list: ["1", "2", "3", "4"],
        title: ""
    }
    componentDidMount() {
        var { location } = this.props
        const { history } = this.props
        location.search = location.search.replace("?", "")
        const parsed = queryString.parse(location.search);
        // console.log(parsed)

        this.setState({ title: parsed.name })
        var page = 1, size = 10, cate_id = parsed.type
        user.getShopClass(page, size, 1, cate_id).then(data => {
            if (data.code == 4) {
                Toast.info(data.msg, 1)
                store.remove("user_infos")
                 history.push("/")
              }
            // console.log(data.data.data)
            if (data.code == 1) {
                this.setState({
                    fenlei_list: data.data.data
                })
            }

        })
        this.setState({
            type: parsed.type,
            goods_id: parsed.id

        })
    }
    details(v) {
        const { history } = this.props
        // console.log(v)
        // return
        history.push(`/details?id=${v}`)
      }
    
    res() {
        const { Checkbox } = this.state
        // const Checkbox=this.state.Checkbox
        // console.log(Checkbox)
    }
    to_num(e){
        var num=parseInt(e)
        // console.log(num)
        if(e)  return    num.toFixed(0)
    
    }
    render() {
        const { history } = this.props
        const { lunber, fenlei, fenlei_list, title } = this.state
        const app = this
        return (
            <div className="res home shopList">
                <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff" }}>
                    <img src={right} onClick={() => history.go(-1)} />
                    {title}
                    {/* <span className="open-shop">
                        开店
          </span> */}
                </div>
                <style>
                </style>
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
                                    <li key={k}  onClick={this.details.bind(this, v.id)} >
                                        <div>
                                        <div style={{height:"2.3rem"}}>  <img src={fetchs.APIHost + v.toutu} alt="" /></div>
                                      
                                            <div>
                                                <p> {v.pd_name}</p>
                                                <p> <span>赠送酿力</span> {v.pd_sendnl?this.to_num(v.pd_sendnl) :""}</p>
                                                <p style={{display:v.pd_qdb != 0?"":"none"}} ><i >￥</i><span>{ v.pd_qdb? v.pd_qdb: 0}QDB </span></p>
                                                <p  style={{display:v.pd_qj != 0?"":"none",textAlign:"right",color:"#f08e2d" }} ><i >￥</i><span>{ v.pd_qj ? v.pd_qj : 0}QJ</span></p>
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

export default shopList;
