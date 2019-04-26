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
class MY_buy extends Component {
  state = {
    title: 0,
    data: "",
    v: 0,
    value: "",
    disabled:true
  }
  async componentDidMount() {

    var { location } = this.props
    const { history } = this.props
    // return
    location.search = location.search.replace("?", "")
    const parsed = queryString.parse(location.search);
    // console.log(parsed)
    var id = parsed.info
    this.setState({
      title: parsed.my
    })
    await user.doc().then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      // console.log(data.data[0])
      if (data.code == 1) {
        this.setState({
          value: data.data[2]
        })
      }


    })
    return
    if (parsed.info) {
      await user.deal_id(id).then(data => {
        if (data.code == 4) {
          Toast.info(data.msg, 1)
          store.remove("user_infos")
          history.push("/")
        }
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
  }
  async  deal_buy() {
    var pwd = this.refs.pwd.value
    var num = this.refs.QJ.value
    var type = this.state.title == 1 ? 0 : 1
    var dj = this.refs.QJ_dj.value
    const { history } = this.props
    var body = {
      num,
      pwd,
      type,
      dj
    }
    if (!num) {
      Toast.info("请输入数量", 2)
      return
    }
    if (!dj) {
      Toast.info("请输入单价", 2)
      return
    }
    if (!pwd) {
      Toast.info("请输入密码", 2)
      return
    }
    // console.log(body)
    this.setState({
      disabled:false
    })
    if(this.state.disabled==false) return
    // Toast.info("正在提交",0)
    await user.deal_sell(body).then(data => {
      this.setState({
        disabled:true
      })
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      if (data.code == 1) {
        Toast.info(data.msg, 2)
        setTimeout(() => {
          history.go(-1)
        }, 2000);
      }
      Toast.info(data.msg, 2)



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
      
        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff", position: "relative" }}>
          <img src={right} onClick={() => history.go(-1)} />
          {title == 1 ? "出让" : "购买"}
        </div>
        <div className="doc" style={{ display: v == 0 ? "block" : "none",  top: ".8rem" }}>
            <div dangerouslySetInnerHTML={{ __html: value.value }}></div>

            <div className="confirm">
              <button onClick={this.ok_no.bind(this, 0)}>取消</button>
              <button onClick={this.ok_no.bind(this, 1)}>确认</button>
            </div>
          </div>
        <div className="buy border " >
     
          <div className="buy-content border">
            <span > QJ数量</span>
            <div className="from-input">
              <input ref="QJ" type="number" placeholder="QJ数量" />
            </div>
          </div>
          <div className="buy-content border">
            <span > {title == 1 ? "出让" : "购买"}单价</span>
            <div className="from-input">
              <input ref="QJ_dj" type="number" placeholder={title == 1 ? "出让单价" : "购买单价"} />
            </div>
          </div>
          <div className="buy-content border">
            <span > 交易密码</span>
            <div className="from-input">
              <input ref="pwd" type="password" placeholder="请输入交易密码" />
            </div>
          </div>
        </div>
        <div className="confirm"><button onClick={this.deal_buy.bind(this, data.id)}>确认</button>
          <div style={{  padding: ".3rem", lineHeight: "1.7", color: 'red',paddingTop:".8rem"}} >
            <p style={{textAlign:"19%"}}>温馨提示：</p>
            <div style={{textIndext:"19%"}}>
              {title == 1 ? <div>
                <p >
                  1.出让单价不得低于当日兑换价值！
               </p>
                <p>
                  2.出让QJ数量不得超过所持有总数的50%.
                </p>
                <p>3.最低出让数为50.</p>
              </div> :
                <div style={{textIndext:"19%"}}>
                  <p>
                   购买单价不得低于当日兑换价值！
                  </p>
                </div>}

            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default MY_buy;
