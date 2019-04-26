import React, { Component } from 'react';
import { List, Toast, Picker } from 'antd-mobile';
import "../public/css/index.css";
import '../public/css/home.css';
import '../public/css/transaction.css';
import '../public/css/buy.css';
import * as user from '../utils/user';
import right from '../public/img/whrtiht-left.png';
var store = require('store');
const day = [
  {
    label: '#FF0000',

    value: '#FF0000',
  },
  {
    label: '#00FF00',

    value: '#00FF00',
  },
  {
    label: '#0000FF',

    value: '#0000FF',
  },
];
class Lock_Position extends Component {
  state = {
    data: [],
    title: 1,
    colorValue: [],
    day: [],
    user_info: [],
    lock: "",
    days: "",
    v: 0,
    value: "",
    disabled:true
  }

  async  componentDidMount() {
    const { history } = this.props
    var user_info = store.get("user_info")
    // console.log(user_info)
    if (user_info) {
      this.setState({
        user_info: user_info
      })
    }
    var page = 1
    var size = 10

    await user.lock().then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
        history.push("/")
      }
      // console.log(data)
      // Toast.info("加载完毕...", 2)
      if (data.code == 1) {
        this.setState({
          day: data.data.day,
          lock: data.data.lock
        })
        console.log(data.data.lock)
      }


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
          value: data.data[3]
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

  async  deal_buy() {
    var pwd = this.refs.pwd.value
    var num = parseInt(this.refs.QJ.value)
    var day = this.state.day
    var id = this.state.colorValue[0]
    var das=id
    var type = this.state.title
    const { history } = this.props


    if (!num) {
      Toast.info("请输入数量", 2)
      return
    }
    if (!day) {
      Toast.info("请选择天", 2)
      return
    }
    if (!pwd) {
      Toast.info("请输入密码", 2)
      return
    }
    var ids;
    day.map((v, k) => {
      console.log(v.value)
      if (v.value == id) {
        return ids = v.id
      }
    })

    var body = {
      num,
      pwd,
      type,
      // day:das,
      id:ids
    }
    console.log(body)
    // return
    Toast.info("提交中", 0)
    this.setState({
      disabled:false
    })
    if(this.state.disabled==false)return
    await user.lock_positon(body).then(data => {
      this.setState({
        disabled:true
      })
      if (data.code == 1) {
         Toast.info(data.msg, 1)
        history.push("/Recharge_forwards")
      } else {
        Toast.info(data.msg, 1)
      }
    })
  }
  // 选择类型
  onclick(e) {
    this.setState({
      title: e
    })
  }
  // 选择天
  onChangeColor = (color, a, c) => {
    console.log(color, a, c)
    this.setState({
      colorValue: color,
      days: color
    });
  };
  onChange = (e, a) => {
    console.log(e, a)
    // return
    this.setState({
      add_id: e,
      colorValue: e,
      days: e
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
    const { data, title, day, lock, v, value } = this.state
    // console.log(day)
    const app = this
    return (
      <div className="res tsc ">
        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff" }}>
          <img src={right} onClick={() => history.go(-1)} />
          锁仓
       </div>
        <div className="transaction" style={{ paddingTop: ".8rem", backgroundColor: "#fff" }}>
          <div className="tsc-content lock">
            <ul className="ul" >
              <li onClick={this.onclick.bind(this, 1)} className={title == 1 ? "on" : ""}>QJ</li>
              <li onClick={this.onclick.bind(this, 2)} className={title == 2 ? "on" : ""}>QDB</li>
            </ul>
          </div>
          <div className="buy border " style={{ marginTop: ".04rem" }} >
            <div className="doc" style={{ display: v == 0 ? "block" : "none" }}>
              <div dangerouslySetInnerHTML={{ __html: value.value }}></div>
              <div className="confirm">
                <button onClick={this.ok_no.bind(this, 0)}>取消</button>
                <button onClick={this.ok_no.bind(this, 1)}>确认</button>
              </div>
            </div>
            <div className="buy-content border">
              <span > 已冻结数量</span>
              <div className="from-input">
                <input type="number" disabled={true} defaultValue={title == 1 ? lock.lock_qj : lock.lock_qdb} placeholder={title == 1 ? "QJ数量" : "QDB数量"} />
              </div>
            </div>
            <div className="buy-content border">
              <span > 可用数量</span>
              <div className="from-input">
                <input type="number" disabled={true} defaultValue={title == 1 ? lock.acc_qj : lock.acc_qdb} placeholder={title == 1 ? "QJ数量" : "QDB数量"} />
              </div>
            </div>
            <div className="buy-content border">
              <span > 锁仓数量</span>
              <div className="from-input">
                <input ref="QJ" type="number" placeholder={title == 1 ? "QJ数量" : "QDB数量"} />
              </div>
            </div>
            <div className="buy-content border days">
              <span > 锁仓期限(天)</span>
              <div className="from-input">
                <Picker
                  data={day}
                  value={this.state.colorValue}
                  cols={1}
                  onChange={this.onChangeColor.bind(this)}
                  onPickerChange={this.onChange.bind(this)}
                >
                  <List.Item arrow="horizontal"></List.Item>
                </Picker>
              </div>
            </div>
            <div className="buy-content border">
              <span > 交易密码</span>
              <div className="from-input">
                <input ref="pwd" type="password" placeholder="请输入交易密码" />
              </div>
            </div>
            <div className="buy-content border">
              <span >收益率</span>
              <div className="from-input">
                <input type="text" defaultValue={this.state.colorValue} />
              </div>
            </div>
          </div>
          <div className="footer" style={{ textAlign: "left", display: "block", padding: ".3rem", boxSizing: 'border-box', position: "relative" }}>
            <h3>锁仓说明:</h3>
            <p>
              根据你选择的数量和期限，到期为您返利。
          </p>
          </div>
          <div className="confirm"><button onClick={this.deal_buy.bind(this, data.id)}>确认</button></div>
        </div>
      </div>
    );
  }
}
export default Lock_Position;
