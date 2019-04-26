import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast, Picker } from 'antd-mobile';
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import '../public/css/App.css'
import '../public/css/buy.css'
import right from '../public/img/whrtiht-left.png'

import userimg from '../public/img/userimg.png'
import arrayTreeFilter from 'array-tree-filter';
var queryString = require('querystring');
const cityData = require('../utils/ssx');
// qiandao_bottom
// const AgreeItem = Checkbox.AgreeItem;
// import { isArray } from 'util';
var store = require('store');
class address extends Component {
  state = {
    title: 0,
    data: "",
    v: 0,
    value: '',
    day: [{ label: "支付宝", value: "0" }, { label: "微信", value: "1" }, { label: "银行卡", value: "2" }],
    colorValue: [],
    colorValues: [],
    days: "",
    pickerValue: [],
  }

  async componentDidMount() {
    var { location } = this.props
    const { history } = this.props
    await user.doc().then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      // console.log(data.data[0])
      if (data.code == 1) {
        this.setState({
          value: data.data[0]
        })
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
    user.rates().then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      // console.log(data.data[0])
      if (data.code == 1) {
        this.setState({
          rate: parseInt(data.data[0].value)
        })
      }
    })
    await user.recharge().then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      // console.log(data)
      // if (!data.data) {
      //   history.go(-1)
      // }
      this.setState({
        day1: data.data ? data.data : ""
      })
      // if (data.data.type == 1) {
      //   this.setState({
      //     title: 1
      //   })
      // }
    })
  }
  async  deal_buy() {
    const { history } = this.props
    var address = this.refs.address.props
    // console.log(address)
    // console.log(address.extra)

    var name = this.refs.name.value
    var mobile = this.refs.mobile.value
    var xq = this.refs.xq.value
  
    if (!name) {
      Toast.info("请输入收货人", 1)
      return
    }
    if (!mobile) {
      Toast.info("请输入联系电话", 1)
      return
    }
    if (address.extra=="请选择") {
      Toast.info("请选择地址", 1)
      return
    }
    if (!xq) {
      Toast.info("请输入详细地址", 1)
      return
    }

    var body = {
     "ad_name": name,
     "ad_tel":mobile,
     "ad_addr":address.extra+","+xq
    }
    
    // console.log(!xq)
    // return 


    await user.addr(body).then(data => {
      if(data){
        console.log(data)
      
      }else{
        Toast.info("链接网络失败")
      }
      // console.log(data)
      if (data.code == 1) {
        history.go(-1)
      
      }
      Toast.info(data.msg, 2)



    })
  }

  onChangeColor = (color, a, c) => {
    // console.log(color,a,c)
    this.setState({
      colorValue: color,
      days: color[0]
    });
  };
  onChangeColors = (color, a, c) => {
    // console.log(color,a,c)
    this.setState({
      colorValue1: color,
      days1: color[0]
    });
    var id = color[0]
    user.rsname(id).then(data => {
      this.setState({
        data: data.data,
      })
    })
  };
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
  onChange_price(e) {
    if (e.target.value) {
      this.refs.GJ_price.value = e.target.value * (this.state.rate) / 100

    }
  }
  onChange = (e, a) => {
    console.log(e)
    this.setState({
      add_id: e,
      pickerValue: e
    })
  }
  onChanges = (e, a) => {
    // console.log(e,a)
    // return
    this.setState({
      add_id1: e,
      colorValue1: e,
      days1: e[0]
    })
    var id = e[0]
    user.rsname(id).then(data => {
      this.setState({
        data: data.data,
      })
    })
  }
  onClick = () => {
    setTimeout(() => {
      this.setState({
        data: cityData.globalData,
      });
    }, 120);
  };
  getSel() {
    const value = "";
    if (!value) {
      return '';
    }
    const treeChildren = arrayTreeFilter(cityData.globalData, (c, level) => c.value === value[level]);
    return treeChildren.map(v => v.label).join(',');
  }
  render() {
    const { history } = this.props
    const { title, data, v, value, day, poundage, day1, pickerValue } = this.state
    console.log(pickerValue)
    return (
      <div className="res ">
        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff", position: "relative" }}>
          <img src={right} onClick={() => history.go(-1)} />
          添加地址
        </div>

        <div className="buy border address " >

          <div className="buy-content border days">
            <div className="buy-content border">
              <span > 收货人</span>
              <div className="from-input">
                <input ref="name" type="text"  placeholder="收货人" />
              </div>
            </div>
            <div className="buy-content border">
              <span > 联系电话</span>
              <div className="from-input">
                <input ref="mobile" type="number" placeholder="联系电话" />
              </div>  
            </div>
            <div className="buy-content border" style={{ width: '97%', display: 'block', margin: '0 auto' }} >
              <Picker
                style={{ fontSize: ".3rem" }}
                visible={this.state.visible}
                data={cityData.globalData}
                value={this.state.pickerValue}
                onChange={v => this.setState({ pickerValue: v })}
                onOk={(v) => this.setState({ visible: false })}
                onDismiss={() => this.setState({ visible: false })}
                onPickerChange={this.onChange}
              >
                <List.Item ref="address" style={{ fontSize: ".3rem" }} extra={this.getSel()} onClick={() => this.setState({ visible: true })}>
                  新增地址
                 </List.Item>
              </Picker>
            </div>
            <div className="buy-content border" style={{ width: "100%" }}>
              <span style={{ display: "block" }}>详细地址</span>
              <textarea cols="30" rows="10" ref="xq" placeholder="请输入50字以内"   ></textarea>
            </div>
          </div>
        </div>
        <div className="confirm"><button onClick={this.deal_buy.bind(this, data.id)}>确认</button></div>
      </div>
    );
  }
}

export default address;
