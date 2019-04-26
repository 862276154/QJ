import React, { Component } from 'react';
import { Toast, ImagePicker } from 'antd-mobile';
// import { Router, Route, Switch, routerRedux, Link, } from 'dva/router';
import "../public/css/index.css"
import '../public/css/home.css'
import * as user from '../utils/user';
import right from '../public/img/whrtiht-left.png'
import app_jia from '../public/img/app_jia.png'
var store =require("store")
const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

var queryString = require('querystring');
class sub_goods extends Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: "4.18rem",
        fenlei: ["1", "2", "3", "4"],
        fenlei_list: ["1", "2", "3", "4"],
        files: [],
        touxiang: "",
        multiple: app_jia,
        files: [],
        multiple: true,
        calss: [],
        selectable: "",
        selectables: 0,
        rate: 0
    }
    componentDidMount() {
        var { location } = this.props
        const { history } = this.props
        location.search = location.search.replace("?", "")
        const parsed = queryString.parse(location.search);
        this.setState({
            type: parsed,
        })
        user.getShopclass().then(data => {
            if (data.code == 4) {
                Toast.info(data.msg, 1)
                store.remove("user_infos")
                 history.push("/")
              }
            this.setState({
                calss: data.data ? data.data : "",
                selectable: data.data[0].id ? data.data[0].id : "",
            })
        })
        user.rate().then(data => {
            if (data.code == 4) {
                Toast.info(data.msg, 1)
                store.remove("user_infos")
                 history.push("/")
              }
            if (data.code == 1) {
                this.setState({
                    rate: parseInt(data.data)
                })
            }
        })
    }
    onChange = (files, type, index) => {
        this.setState({
            files,
        });
    }
    onChange_price(e) {
        if (e.target.value) {
            this.refs.GJ_price.value = e.target.value * (this.state.rate)
        }
    }
    onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        this.setState({
            multiple: index === 1,
        });
    }

    getLocalImg(e) {
        if (!e.target.files[0]) {
            return
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (e) {
            this.setState({
                imgUrl: e.target.result
            })
            return this.result
        }.bind(this)
    }
    subm() {
        const { history } = this.props
        var img = this.state.imgUrl,
            // name = this.refs.name.value,
            // mobile = this.refs.mobile.value,
            price = this.refs.price.value,
            GJ_price = this.refs.GJ_price.value,
            shop_name = this.refs.shop_name.value,
            shop_Stock = this.refs.shop_Stock.value,
            shop_banner = this.state.files,
            shop_calss = this.state.selectable,
            describe = this.refs.describe.value,
            pd_unit = this.refs.pd_unit.value
        var body = {
            img, name:"", mobile:"", price, GJ_price, shop_name, shop_Stock, shop_banner, shop_calss, describe, pd_unit
        }
        // console.log(shop_banner)
        if (shop_banner.length<=0) {
            return Toast.info("请上传轮播图")
        }
        // console.log(price=="",GJ_price=="")
        if (!price&&!GJ_price) {
            return Toast.info("请填写其中一个价格")
        }else {

        }
        if (!img) {
            return Toast.info("请上详情图")
        }
        Toast.info("提交中",0)
        user.product_upload(body).then(data => {
            if (data.code == 4) {
                Toast.info(data.msg, 1)
                store.remove("user_infos")
                 history.push("/")
              }
            if (data.code == 1) {
                Toast.info(data.msg)
                history.push("/Release")
            } else {
                Toast.info(data.msg)
            }
        })
    }
    selectable(e) {
        // console.log(e)
        this.setState({
            selectables: e.k,
            selectable: e.v.id
        })
    }
    render() {
        const { history } = this.props
        const { files, calss } = this.state;
        const app = this
        // console.log(calss)
        return (
            <div className="res home appshop" >
                <style>
                    {
                        `    
                        .fengmianDiv input{ display:none;}
                        .fengmianDiv img{ 
                            width:90%;
                            height: 3.48rem;
                            border-radius: .3rem;
                            margin-bottom: .3rem;
                            border:1px #ccc dashed;
                        }  `
                    }
                </style>
                <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff" }}>
                    <img src={right} onClick={() => history.go(-1)} />
                    发布商品
                    <span className="open-shop" onClick={this.subm.bind(this)} >
                        提交
                    </span>
                </div>
                <style>
                </style>
                <div className="user-content" style={{ paddingTop: "1rem" }}>
                    <div className="form" style={{ display: "initial" }}>
                        <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 8}
                            multiple={this.state.multiple}
                        />
                    </div>
                </div>
                <div className="user-content" style={{ paddingTop: "0rem" }}>
                    <div className="form textarea">
                        <textarea ref="describe" placeholder="给新货来一段出神入化的描述吧" name="" id="" cols="30" rows="4" ></textarea>
                    </div>
                </div>
                <div className="user-content" style={{ paddingTop: "0rem" }}>
                    {/* <div className="form">
                        <span>姓名:</span>
                        <input type="text" ref="name" placeholder="请输入有效姓名" />
                    </div>
                    <div className="form">
                        <span>手  机  号:</span>
                        <input type="number" ref="mobile" placeholder="请输入手机号" />
                    </div> */}
                    <div className="form">
                        <span>QDB售价:</span>
                        <input type="number" ref="price" placeholder="售价" />
                    </div>
                    <div className="form">
                        <span>QJ售价:</span>
                        <input type="number" ref="GJ_price" placeholder="售价" />
                    </div>
                    <div className="form">
                        <span>规格:</span>
                        <input type="text" ref="pd_unit" placeholder="规格" />
                    </div>
                    <div className="form">
                        <span>商品名称:</span>
                        <input type="text" ref="shop_name" placeholder="商品名称" />
                    </div>
                    <div className="form">
                        <span>我的库存:</span>
                        <input type="number" ref="shop_Stock" placeholder="我的库存" />
                    </div>
                </div>
                <div className="user-content" style={{ paddingTop: "0rem", textAlign: "left" }}>
                    <div className="form" style={{ padding: "0" }} >
                        <span className="class_span">分类:</span>
                        <div className="form">
                            <ul>
                                {calss.map((v, k) => {
                                    return (
                                        <li onClick={this.selectable.bind(this, { v, k })} className={this.state.selectables == k ? "on" : ""} key={k}>{v.cate_name}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div style={{ padding: ".3rem", backgroundColor: "rgb(224, 224, 224)" }}>
                    <div className="from-img">
                        <div className="img">
                            <label className="fengmianDiv">
                                <input id="imgURl" name="from" ref="files" type="file" onChange={(e) => this.getLocalImg(e)} accept="image/jpeg,image/x-png,image/gif" />
                                <img style={{ height: "auto", borderRadius: "0" }} className="id_card" ref="cover" name="enter_imgsPath" src={this.state.imgUrl ? this.state.imgUrl : app_jia} />
                            </label>
                        </div>
                        <p>商品详情图</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default sub_goods;
