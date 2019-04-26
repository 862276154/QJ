import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
// import { Router, Route, Switch, routerRedux, Link, } from 'dva/router';
import "../public/css/index.css"
import '../public/css/home.css'
// import '../public/css/Storeapplication.css'
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
// import logo from '../public/img/login.png'
//search  Sign_in 
// import search from '../public/img/search.png'
// import Sign_in from '../public/img/Sign_in.png'
import right from '../public/img/whrtiht-left.png'
import app_jia from '../public/img/app_jia.png'
// import shop1 from '../public/img/f1 (1).png'
// import shop2 from '../public/img/f1 (2).png'
// import shop3 from '../public/img/f1 (3).png'
// const AgreeItem = Checkbox.AgreeItem;
// import shopshow from '../public/img/首页_38.png'
// import $ from 'jquery';
var store = require('store');
var queryString = require('querystring');
class Storeapplication extends Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: "4.18rem",
        fenlei: ["1", "2", "3", "4"],
        fenlei_list: ["1", "2", "3", "4"],
        files: [],
        touxiang: "",
        multiple: app_jia
    }
    componentDidMount() {
        // var { location } = this.props
        // location.search = location.search.replace("?", "")
        // const parsed = queryString.parse(location.search);
        // console.log(parsed)
        // this.setState({
        //     type: parsed,
        // })
        user.xxck().then(data => {
            // console.log(data)
            if (data.code == 1&& data.data.sfxx  ) {
                this.setState({
                    imgUrl: fetchs.APIHost + data.data.sfxx.sfz_pic,
                    imgUrl1: fetchs.APIHost + data.data.sfxx.sfz_pic2,
                })
                if (data.data.sfxx.status == 1) {
                    Toast.info("审核已通过！")
                }
                this.refs.name.value = data.data.sfxx.zsxm
                // zj_type = this.refs.zj_type.value,
                this.refs.zj_number.value = data.data.sfxx.sfz_num
            }

        })

    }

    getLocalImg(e) {
        // Toast.info("加载中...")
        if (!e.target.files[0]) {
            return
        }
        var reader = new FileReader();
        // var img=e.target.files[0]
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (e) {
            this.setState({
                imgUrl: e.target.result
            })
            return this.result
        }.bind(this)
    }
    getLocalImg1(e) {
        // Toast.info("加载中...")
        if (!e.target.files[0]) {
            return
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (e) {
            this.setState({
                imgUrl1: e.target.result
            })
            return this.result
        }.bind(this)
    }

    subm() {
        const { history } = this.props
        var img = this.state.imgUrl,
            img1 = this.state.imgUrl1,
            name = this.refs.name.value,
            // zj_type = this.refs.zj_type.value,
            zj_number = this.refs.zj_number.value
        // address = this.refs.address.value
        var body = {
            img, img1, name, zj_number
        }
        if (!name) {
            Toast.info("请填写真实姓名")
            return
        }

        // if (!zj_type) {
        //     Toast.info("请填写类型")
        //     return 
        // }
        if (!zj_number) {
            Toast.info("请填写身份证号")
            return
        }
        // if (!address) {
        //     Toast.info("请输入地址")
        //     return 
        // }
        if (!img) {
            Toast.info("请上传身份证正面")
            return
        }
        if (!img1) {
            Toast.info("请上传身份证背面")
            return
        }

        // console.log(body)
        Toast.info("提交中...")
        user.merchant_submits(body).then(data => {
            if (data.code == 4) {
                Toast.info(data.msg, 1)
                store.remove("user_infos")
                history.push("/")
            }
            // console.log(data)
            if (data.code == 1) {
                Toast.info(data.msg)
                history.go(-1)
            } else {
                Toast.info(data.msg)
            }
        })
    }


    render() {
        const { history } = this.props
        const { lunber, fenlei, fenlei_list, type } = this.state
        const { files, headerimg, userinfo, touxiang } = this.state;
        const app = this
        return (
            <div className="res home appshop" >
                <style>
                    {
                        `    .fengmianDiv input{ display:none;}
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
                    身份信息绑定
                </div>
                <style>
                </style>
                <div className="user-content" style={{ paddingTop: "1rem" }}>
                    <div className="form">
                        <span>真实姓名:</span>
                        <input type="text" ref="name" placeholder="请输入有效姓名" />
                    </div>

                    {/* <div className="form">
                        <span>证件类型:</span>
                        <input type="text" ref="zj_type" placeholder="请输入证件类型" />
                    </div> */}
                    <div className="form">
                        <span>证  件  号:</span>
                        <input type="text" ref="zj_number" placeholder="请输入证件号" />
                    </div>
                    {/* <div className="form">
                        <span>现居地址:</span>
                        <input type="text" ref="address" placeholder="请输入现居地址" />
                    </div> */}
                </div>
                <div style={{ padding: ".3rem", backgroundColor: "rgb(224, 224, 224)" }}>
                    <div className="from-img">
                        <div className="img">
                            <label className="fengmianDiv">
                                <input id="imgURl" name="from" ref="files" type="file" onChange={(e) => this.getLocalImg(e)} accept="image/jpeg,image/x-png,image/gif" />
                                <img className="id_card" ref="cover" name="enter_imgsPath" src={this.state.imgUrl ? this.state.imgUrl : app_jia} />
                            </label>
                        </div>
                        <p>身份证正面</p>
                    </div>
                    <div className="from-img">
                        <div className="img">
                            <label className="fengmianDiv">
                                <input id="imgURl" name="from" ref="files" type="file" onChange={(e) => this.getLocalImg1(e)} accept="image/jpeg,image/x-png,image/gif" />
                                <img className="id_card" ref="cover" name="enter_imgsPath" src={this.state.imgUrl1 ? this.state.imgUrl1 : app_jia} />
                            </label>
                            <p>身份证背面</p>
                        </div>
                    </div>
                    <div className="shopapp-footer" >
                        <button onClick={this.subm.bind(this)} >确定</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default Storeapplication;
