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
        rate: 0,
        id:"",
        type:""
    }
    componentDidMount() {
        var { location } = this.props
        const { history } = this.props
        location.search = location.search.replace("?", "")
        const parsed = queryString.parse(location.search);
        console.log(parsed)
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
        var name = this.refs.name.value,
            mobile = this.refs.mobile.value,
            describe = this.refs.describe.value,
            id=this.state.type.id
        var body = {
             name, mobile,describe,id
        }
        user.feedback(body).then(data => {
            if (data.code == 4) {
                Toast.info(data.msg, 1)
                store.remove("user_infos")
                 history.push("/")
              }

            if (data.code == 1) {
                Toast.info(data.msg)

                history.push("/Recharge_forward?type=2")

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
                <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff",position:"relative" }}>
                    <img src={right} onClick={() => history.go(-1)} />
                     问题反馈
                    <span className="open-shop" onClick={this.subm.bind(this)} >
                        提交
                    </span>
                </div>
            
                <div className="user-content" style={{ paddingTop: "0rem" }}>
                    <div className="form textarea">
                        <textarea ref="describe" placeholder="请描述您的问题，我们会尽快处理" name="" id="" cols="30" rows="4" ></textarea>
                    </div>
                </div>
                <div className="user-content" style={{ paddingTop: "0rem" }}>
                   
                    <div className="form">
                        <span>联   系   人:</span>
                        <input type="text" ref="name" placeholder="请输入联系人" />
                    </div>
                    <div className="form">
                        <span>手   机   号:</span>
                        <input type="number" ref="mobile" placeholder="手机号" />
                    </div>
                   
                </div>
         
      
            </div>
        );
    }
}

export default sub_goods;
