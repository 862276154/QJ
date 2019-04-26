import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast, Picker } from 'antd-mobile';
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import '../public/css/App.css'
import '../public/css/buy.css'
import '../public/css/home.css'
import right from '../public/img/whrtiht-left.png'
import app_jia from '../public/img/app_jia.png'
import OK_buy from '../public/img/OK_buy.png'
var queryString = require('querystring');
// qiandao_bottom
// const AgreeItem = Checkbox.AgreeItem;
// import { isArray } from 'util';
var store = require('store');
class Recharge extends Component {
  state = {
    title: 0,
    data: "",
    day: [{ label: "微信", value: "0" }, { label: "支付宝", value: "1" }, { label: "银行卡", value: "2" }],
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
      title: parsed.my,
      img: ""
    })

    await user.recharge(id).then(data => {
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
        day: data.data ? data.data : ""
      })
      // if (data.data.type == 1) {
      //   this.setState({
      //     title: 1
      //   })
      // }
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
          value: data.data[1]
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
  }
  async  recharges() {

    var num = this.refs.num.value

    const { history,} = this.props
    var disabled=this.state.disabled
    var body = {
      num,
      img: this.state.imgUrl,
      id: this.state.days

    }
    if (!num) {
      Toast.info("请输入数量", 2)
      return
    }
    if (!body.img) {
      Toast.info("请提交打款凭证", 2)
      return
    }
    // console.log(body)
    Toast.info("提交中", 0)
    this.setState({
      disabled:false 
    })
    if(disabled==false){
      return
    } 
    await user.recharges(body).then(data => {
      // console.log("不能提交")
      
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      if (data.code == 1) {
        Toast.info(data.msg, 2)
        this.setState({
          disabled:true
        })
        setTimeout(() => {
          history.push("/Recharge_forward?type=1")
        }, 2000);
      }else{
        Toast.info(data.msg, 2)
        this.setState({
          disabled:true
        })
      }
     



    })
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
  onChangeColor(color, a, c) {
    // console.log(color, a, c)
    // var id = color[0]
    // console.log(id)
    this.setState({
      colorValue: color,
      days: color[0],
    })


  };

  onChange = (e, a) => {
    console.log(e)
    // return
    this.setState({
      add_id: e,
      colorValue: e
    })
    var id = e[0]
    user.rsname(id).then(data => {
      this.setState({
        data: data.data,
      })
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
    const { title, data, day, v, value,disabled } = this.state
    // console.log(data)
    return (
      <div className="res ">
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
        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff", position: "relative" }}>
          <img src={right} onClick={() => history.go(-1)} />
          购买QDB
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
            <span > 购买数量</span>
            <div className="from-input">
              <input ref="num" type="number" placeholder="1QDB=1CNY" />
            </div>
          </div>
          <div className="buy-content border">
            <h2>请在以下代理商中选择,然后提交凭证.</h2>
          </div>
          <div className="buy-content border">
            <span > 代理商</span>
            <div className="from-input">
              <Picker
                data={day}
                value={this.state.colorValue}
                cols={1}
                onPickerChange={this.onChange}
                onOk={this.onChange}
                onDismiss={() => this.setState({ visible: false })}
                onChange={this.onChangeColor.bind(this)} >
                <List.Item arrow="horizontal"></List.Item>
              </Picker>
            </div>
            {/* <img src={OK_buy} alt=""/> */}
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

          <div style={{ padding: ".3rem", backgroundColor: "rgb(224, 224, 224)", textAlign: 'center' }}>
            <div className="from-img">
              <div className="img">
                <label className="fengmianDiv">
                  <input id="imgURl" name="from" ref="files" type="file" onChange={(e) => this.getLocalImg(e)} accept="image/jpeg,image/x-png,image/gif" />
                  <img style={{ height: "auto", borderRadius: "0" }} className="id_card" ref="cover" name="enter_imgsPath" src={this.state.imgUrl ? this.state.imgUrl : app_jia} />
                </label>
              </div>
              <p>上传打款凭证</p>
            </div>
          </div>
        </div>
        <div className="confirm" style={{ marginBottom: ".3rem" }}><button disabled={!disabled} onClick={this.recharges.bind(this, data.id)}>确认</button></div>
      </div>
    );
  }
}

export default Recharge;
