import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast } from 'antd-mobile';
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import '../public/css/App.css'
import '../public/css/buy.css'
import right from '../public/img/whrtiht-left.png'
import userimg from '../public/img/userimg.png'
var queryString = require('querystring');
// qiandao_bottom
// const AgreeItem = Checkbox.AgreeItem;
// import { isArray } from 'util';
var store = require('store');
class buy extends Component {
  state = {
    title: 0,
    data: "",
    v: 0,
    value: "",
    
  }
  async componentDidMount() {
    var { location } = this.props
    const { history } = this.props
    location.search = location.search.replace("?", "")
    const parsed = queryString.parse(location.search);
    // console.log(parsed)
    var id = parsed.info
    if (parsed.info) {
      await user.deal_id(id).then(data => {
        // console.log(data.data)
        if (!data.data) {
          history.go(-1)
        }
        this.setState({
          data: data.data ? data.data : ""
        })
        if (data.data.type == 1) {
          this.setState({
            title: 1
          })
        }
      })
    }
    await user.doc().then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      // console.log(data.data[0])
      if (data.code == 1) {
        this.setState({
          value: data.data[1]
        })
      }
    })
  }
  async  deal_buy(id) {
    var pwd = this.refs.pwd.value
    const { history } = this.props
    var body = {
      id,
      pwd
    }
    if (!pwd) {
      Toast.info("请输入密码", 1)
      return
    }
    this.setState({
      disabled:false
    })
    Toast.info("提交中", 0)
    if(this.state.disabled==false) return
    await user.deal_buy(body).then(data => {
      this.setState({
        disabled:true
      })
      if (data.code == 1) {
        Toast.info(data.msg, 1)
        history.push("/transaction_history")
      }
      Toast.info(data.msg, 1)
    })
  }
  ok_no(v) {
    const { history } = this.props
    if (v == 1) {
      this.setState({
        v: v
      })
    } else {
      history.go(-1)
    }
  }
  render() {
    const { history } = this.props
    const { title, data, v, value } = this.state
    // console.log(data)
    return (
      <div className="res ">
        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff" }}>
          <img src={right} onClick={() => history.go(-1)} />
          {title == 1 ? "出让" : "购买"}
        </div>
        <div className="buy" >

          <div className="doc" style={{ display: v == 0 ? "block" : "none", position: "fixed", top: ".8rem" }}>
            <div dangerouslySetInnerHTML={{ __html: value.value }}></div>

            <div className="confirm">
              <button onClick={this.ok_no.bind(this, 0)}>取消</button>
              <button onClick={this.ok_no.bind(this, 1)}>确认</button>
            </div>
          </div>
          <div className="buy-content">
            <span > 交易方</span>
            <div >
              {/* <img src={userimg} alt="" /> */}
              <img src={title == 0 ? data.us_avatar ? fetchs.APIHost + data.us_avatar : userimg : data.b_avatar ? fetchs.APIHost + data.b_avatar : userimg} alt="" />
            </div>
          </div>
          <div className="buy-content">
            <span > 手机号</span>
            <div >
              <p>{title == 1 ? data.btel : data.us_tel}</p>
              {/* <p> {title==0? data.us_tel:""}</p> */}
            </div>
          </div>
          <div className="buy-content">
            <span > 昵称</span>
            <div >
              <p> {title == 1 ? data.bname : data.us_name}</p>
            </div>
          </div>
        </div>
        <div className="buy border " >
          <div className="buy-content border">
            <span > QJ数量</span>
            <div >
              <p>{data.num}</p>
            </div>
          </div>
          <div className="buy-content border">
            <span > QDB价格</span>
            <div >
              <p>{data.price}</p>
            </div>
          </div>
          <div className="buy-content border">
            <span >数量</span>
            <div >
              <p>{parseInt( data.num).toFixed(0)}</p>
            </div>
          </div>
          <div className="buy-content border">
            <span > 扣除类型</span>
            <div className="from-input" style={{ color: "red" }}>
              {title == 1 ? "QJ" : "QDB"}
            </div>
          </div>
          <div className="buy-content border">
            <span > 交易密码</span>
            <div className="from-input">
              <input ref="pwd" type="password" placeholder="请输入交易密码" />
            </div>
          </div>
          <div className="confirm"><button onClick={this.deal_buy.bind(this, data.id)}>确认</button></div>
        </div>


      </div>
    );
  }
}

export default buy;
