import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast, Picker } from 'antd-mobile';
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import '../public/css/App.css'
import '../public/css/buy.css'
import right from '../public/img/whrtiht-left.png'
import ico_1 from '../public/img/ico_1.png'
import ico_2 from '../public/img/ico_2.png'

import userimg from '../public/img/userimg.png'
import arrayTreeFilter from 'array-tree-filter';
var queryString = require('querystring');
const cityData = require('../utils/ssx');
// qiandao_bottom
// const AgreeItem = Checkbox.AgreeItem;
// import { isArray } from 'util';
var store = require('store');
class address_gl extends Component {
  state = {
    data: []
  }

  async componentDidMount() {

    this.addres()
  }
  async addres() {
    Toast.info("加载中")
    await user.addr_get().then(data => {
      if (data) {
        console.log(data)
        if (data.code == 1) {
          this.setState({
            data: data.data
          })
        }

      } else {
        Toast.info("链接网络失败")
      }
      // console.log(data)
      if (data.code == 1) {
      }
 
    })
  }
  async address(e) {
    // console.log(e)
    // console.log(e[0])
    // return
    if (e[0] == 1) {
      // 默认 
      await user.addr_get_df(e[1].id).then(data => {
        if (data) {
          console.log(data)
          this.addres()
        }
        Toast.info(data.msg, 2)
      })
    } else if (e[0] = 2) {
      await user.addr_get_dl(e[1].id).then(data => {
        if (data) {
          console.log(data)
          this.addres()
        }
        Toast.info(data.msg, 2)
      })
    }
  }


  render() {
    const { history } = this.props
    const { data } = this.state

    return (
      <div className="res ">
        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff", position: "relative" }}>
          <img src={right} onClick={() => history.go(-1)} />
          地址管理
          <span style={{position:"absolute",right:".2rem",top:".2rem",fontSize:".2rem"}}  onClick={() => history.push("/address")}>添加地址</span>
        </div>

        <div className="buy border address " >

          <div className="buy-content">
            {data.map((v, k) => {
              return (
                <div key={k} className="buy-content border">
                  <div className="float">   <span style={{color:"#ccc"}} > 收货人: <span style={{color:"#000"}}>{v.ad_name}</span></span> <span> <i style={{color:'#ccc'}}>联系电话 :  </i>{v.ad_tel}</span></div>
                  <div className="float" >
                    <span><i style={{color:'#ccc'}}>地址：</i>{v.ad_addr}</span>
                  </div>
                  <div className="float" >
                    <span onClick={this.address.bind(this, [1, v])} ><img src={v.default == 0 ? ico_1 : ico_2} alt="" /> 设为默认</span>
                    <div onClick={this.address.bind(this, [2, v])} className="e_d"><span>删除</span> </div>
                  </div>
                </div>
              )
            })}
           <p style={{textAlign:"center"}}> {data.length<=0?"暂无收货地址!":""}</p>
          </div>
        </div>
        <div className="confirm"><button onClick={() => history.push("/address")}>添加收货地址</button></div>
      </div>
    );
  }
}

export default address_gl;
