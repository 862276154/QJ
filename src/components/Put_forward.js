import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast,Picker  } from 'antd-mobile';
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
class Put_forward extends Component {
  state = {
    title: 0,
    data: "",
    v: 0,
    value: '',
    day:[{label:"支付宝",value:"0"},{label:"银行卡",value:"2"}],
    colorValue:[],
    colorValues:[],
    days:"",
    disabled:true
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
    user.rates().then(data=>{
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
         history.push("/")
      }
      // console.log(data.data[0])
      if(data.code==1){
          this.setState({
              rate:parseInt(data.data[0].value)
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
    var pwd = this.refs.pwd.value
    var num = this.refs.QJ.value
    var type = this.state.days
    var disabled =this.state.disabled
    const { history } = this.props
    var body = {
      num,
      pwd,
      type,
      id:this.state.days1
      
    }
    if (!num) {
      Toast.info("请输入数量", 1)
      return
    }
    if (!pwd) {
      Toast.info("请输入密码", 1)
      return
    }
    if (!type) {
      Toast.info("请选择提现方式", 1)
      return
    }
// console.log(body)
    // return 
    this.setState({
      disabled:false 
    })
    if(disabled==false){
      return
    } 
    Toast.info("提交中...", 0)
    await user.buyback(body).then(data => {
      // console.log(data)
      if (data.code == 1) {
         Toast.info(data.msg, 1)
         history.push("/Recharge_forward?type=2")
        // this.setState({
        //   disabled:true 
        // })
      
        // setTimeout(() => {
        //   history.push("/Recharge_forward?type=2")
        // }, 2000);
      }else{
        Toast.info(data.msg, 1)
        this.setState({
         disabled:true 
       })
      }

    })
  }
  onChangeColor=(color,a,c)=> {
    console.log(color,a,c)
    this.setState({
      colorValue: color,
      days:color[0]
    });
  };
  onChangeColors=(color,a,c)=> {
    console.log(color,a,c)
    this.setState({
      colorValue1: color,
      days1:color[0]
    });
    var id = color[0]
    user.rsname(id).then(data => {
      this.setState({
        data:data.data,
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
  onChange_price(e){
    if(e.target.value){
    this.refs.GJ_price.value= e.target.value*(this.state.rate)/100
    }
}
onChange = (e, a) => {
  console.log(e,a)
  // return
  this.setState({
      add_id: e,
      colorValue: e,
      days:e[0]
  })
}
onChanges = (e, a) => {
  console.log(e,a)
  // return
  this.setState({
      add_id1: e,
      colorValue1: e,
      days1:e[0]
  })
  var id = e[0]
  user.rsname(id).then(data => {
    this.setState({
      data:data.data,
    })
  })
}
  render() {
    const { history } = this.props
    const { title, data, v, value,day,poundage,day1,disabled } = this.state
    // console.log(day)
    return (
      <div className="res ">
        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff", position: "relative" }}>
          <img src={right} onClick={() => history.go(-1)} />
          QDB出售
        </div>
        <div className="doc" style={{ display: v == 0 ? "block" : "none",height:"90%" }}>
            <div dangerouslySetInnerHTML={{ __html: value.value }}></div>
 
            <div className="confirm">
              <button onClick={this.ok_no.bind(this, 0)}>取消</button>
              <button onClick={this.ok_no.bind(this, 1)}>确认</button>
            </div>
          </div>
        <div className="buy border " >
       
          <div className="buy-content border">
            <span > QDB出售</span>
            <div className="from-input">
              <input ref="QJ" type="number"  onChange={this.onChange_price.bind(this)} placeholder="QDB出售数量" />
            </div>
          </div>
          <div className="buy-content border">
            <span > 服务费</span>
            <div className="from-input">
              <input style={{color:"red"}} ref="GJ_price"   disabled={true}  type="number" placeholder="服务费" />
            </div>
          </div>
          <div className="buy-content border">
            <span > 交易密码</span>
            <div className="from-input">
              <input ref="pwd" type="password" placeholder="请输入交易密码" />
            </div>
          </div>
          <div className="buy-content border days">
            <span >代理账户</span>
            <div className="from-input">
            <Picker
                data={day1}
                value={this.state.colorValue1}
                cols={1}
                onPickerChange={this.onChanges}
                // onOk={(v) => this.setState({ visible: false })}
                // onDismiss={() => this.setState({ visible: false })}
                onChange={this.onChangeColors.bind(this)} >
                <List.Item arrow="horizontal"></List.Item>
              </Picker>
            </div>
          </div>
          <div className="buy-content border">
            <span > 银行卡</span>
            <div className="from-input">
              <input defaultValue={data.banknum} disabled={true} placeholder="银行卡" />
            </div>
          </div>
          <div className="buy-content border">
            <span > 开户行</span>
            <div className="from-input">
              <input defaultValue={data.bank_addr} disabled={true} placeholder="开户行" />
            </div>
          </div>
          <div className="buy-content border">
            <span > 支付宝</span>
            <div className="from-input">
              <input defaultValue={data.alipay} disabled={true} placeholder="支付宝" />
            </div>
          </div>
          <div className="buy-content border days">
            <span >结算方式</span>
            <div className="from-input">
              <Picker
                data={day}
                value={this.state.colorValue}
                cols={1}
                onPickerChange={this.onChange}
                onChange={this.onChangeColor} >
                <List.Item arrow="horizontal"></List.Item>
              </Picker>
            </div>
          </div>
        </div>
        <div className="confirm"><button disabled={this.disabled} onClick={this.deal_buy.bind(this, data.id)}>确认</button></div>
      </div>
    );
  }
}

export default Put_forward;
