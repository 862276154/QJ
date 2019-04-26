import React, { Component } from 'react';
import { Button, Toast } from 'antd-mobile';
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import '../public/css/App.css'
import '../public/css/Brew.css'
import right from '../public/img/whrtiht-left.png'

class BuyBrew extends Component {
  state = {
    BuyBrew: ["1", "2", "3", "4", "5"],
    Modal: false,
    show: false,
    buy: { id: "21" },
    disabled:true
  }
  res() {
    const { Checkbox } = this.state
    // const Checkbox=this.state.Checkbox
    // console.log(Checkbox)
  }

  async  componentDidMount() {
    await user.BuyBrew().then(data => {
      // console.log(data.data)
      // return
      // console.log(this)
      if (data.code == 1) {
        this.setState({
          BuyBrew: data.data
        })
      }
    })

  }
  BuyBrew(buy) {
    const { history } = this.props
    // var buy = this.state.buy
    // console.log(buy)
    var pwd = this.refs.psd.value
    var id = buy.id

    var body = {
      id: id,
      pwd: pwd,
    }
    // console.log(pwd == "")

    if (pwd == "") {
      Toast.info("请输入密码!")
      return
    }
    // console.log(body)
    Toast.info("正在提交",0)
    // return
    this.setState({
      disabled:false
    })
    if(this.state.false==false)return
    user.BuyBrew_buy(body).then(data => {
      this.setState({
        disabled:true
      })
      // console.log(data)
      if (data.code == 1) {
        Toast.info(data.msg)
        this.setState({ show: false })
        history.push("/Brew")
      } else {
        Toast.info(data.msg)
      }
    })
    // return id
  }

  show_modale() {
    this.setState({
      Modal: !this.state.show
    })
  }
  render() {
    const { history } = this.props
    const { BuyBrew, show, buy } = this.state
    // console.log(BuyBrew)
    return (
      <div className="res  Brew">
        <div className="res-hader " style={{ backgroundColor: "#44041D", color: "#fff" }}>
          <img src={right} onClick={() => history.go(-1)} />
          酿酒坊-购买
        </div>
        <div className="Buy " >
          <ul>
            {BuyBrew.map((v, k) => {
              return (
                <li key={k}>
                  <div>
                    <img src={fetchs.APIHost + v.image} />
                    <div>
                      <p>{k + 1}级{v.name}酿酒坊</p>
                      <p>赠送酿力值：{v.send_nl}</p>
                      <p>酿期期限：{v.day}天</p>
                    </div>
                  </div>
                  <div className="Brew-footer">
                    <span onClick={() => this.setState({ show: true, buy: v })} >购买</span>

                  </div>
                </li>
              )
            })}
          </ul>
        </div>
          <div className="mask" style={{ display: show == true ? "block" : "none" }}>
            <div className="modale">
              <div className="contenter" style={{ position: 'relative', top: "0" }}>
                <div className="modale-title">
                  <div>
                    购买{buy.name}酿酒坊
                  </div>
                  <div>花费<span style={{ color: "red" }}>{buy.price ? buy.price : "0"}</span></div>
                </div>
                <div className="modale-contente" >
                  <div>
                    <span>请输入密码:</span> <input ref="psd" type="password" placeholder="密码" />
                  </div>
                </div>
                <div className="modale-foot" >
                  <button onClick={() => this.setState({ show: false })}>取消</button>
                  <button onClick={this.BuyBrew.bind(this, buy)} >确定</button>
                </div>
              </div>
            </div>
          </div>
       </div>
    );
  }
}

export default BuyBrew;
