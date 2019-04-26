import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast } from 'antd-mobile';
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import '../public/css/App.css'
import '../public/css/Brew.css'
import right from '../public/img/whrtiht-left.png'
// qiandao_bottom
// const AgreeItem = Checkbox.AgreeItem;
import jiuf1 from '../public/img/jiuf (1).png'
import jiuf2 from '../public/img/jiuf (2).png'
import jiuf3 from '../public/img/jiuf (3).png'
import jiuf4 from '../public/img/jiuf (4).png'
import jiuf5 from '../public/img/jiuf (5).png'

class Brew extends Component {
  state = {
    BuyBrew: [],
    Modal: false,
    show: false,
    buy: { id: "21" }
  }
  async  componentDidMount() {
    var page = 1, size = 1000
    var body = {
      page,
      size
    }

    await user.brew_list(body).then(data => {
      console.log(data)
      // return
      // console.log(this)
      if (data.code == 1) {
        this.setState({
          BuyBrew: data.data.data
        })
      }
    })

  }
  async brew_list() {

    var page = 1, size = 1000
    var body = {
      page,
      size
    }
    await user.brew_list(body).then(data => {
      console.log(data)
      // return
      // console.log(this)
      if (data.code == 1) {
        this.setState({
          BuyBrew: data.data.data
        })
      }
    })
  }


  BuyBrew(buy) {
    const { history } = this.props
    // var buy = this.state.buy
    // console.log(buy)
    // var pwd = this.refs.psd.value
    var id = buy.id

    var body = {
      id: id,
      // pwd: pwd,
    }
    // console.log(pwd == "")

    // if (pwd == "") {
    //   Toast.info("请输入密码!")
    //   return
    // }
    console.log(body, buy.id)
    user.brew_lists(body).then(data => {
      console.log(data)
      if (data.code == 1) {
        Toast.info(data.msg)
        this.setState({ show: false })
        // history.push("/Brew")

        this.brew_list()
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
  on_bred(v){
    console.log(v)
     if(v.status==6){
      this.setState({ show: true, buy: v })
     }
  }
  render() {
    const { history } = this.props
    const { BuyBrew, show, buy } = this.state
    // console.log(BuyBrew)
    return (
      <div className="res  Brew">
        <style>
          {`
         .am-checkbox-agree{
          left: 26%;
         }
         .am-checkbox-agree .am-checkbox{
          left: -.1rem;
          top: .13rem;
         }
         .am-checkbox-inner{
          border-radius: 1px;
         }
         .checkbox .am-checkbox-input, .am-checkbox-inner{
          width: 0.2rem;
          height: 0.2rem;
          border: 1px solid #3b8dbb;
         }
        .am-checkbox.am-checkbox-checked .am-checkbox-inner{
          border-color: #5d0a0e;
          background: #920d14;
        }
         `}
        </style>
        <div className="res-hader " style={{ backgroundColor: "#44041D", color: "#fff" }}>
          <img src={right} onClick={() => history.push("/home/Makewine")} />
          我的酿酒坊
        </div>
        <div className="Buy " >
          <ul>
            {BuyBrew.map((v, k) => {
              console.log(v)
              return (
                <li key={k}>
                  <div>
                    <span className="img" style={{ height: "2rem", verticalAlign: "super" }}>
                      <img src={fetchs.APIHost + v.bhtype.image} />
                    </span>
                    <div>
                      <p>{v.bhtype.id}级{v.bhtype.name}酿酒坊</p>
                      <p>酿力值：{v.send_nl}</p>
                      {/* created_time */}
                      <p>购买时间：{v.created_time}</p>
                      <p>酿期期限：{v.day}天</p>
                      <p>开启时间{v.start}</p>
                      <p>结束时间{v.end}</p>
                    </div>
                  </div>
                  <div className="Brew-footer">
                    <span onClick={    this.on_bred.bind( this,v )} >
                      {v.status == 0 ? "开启" : ""}
                      {v.status == 1 ? "已开启" : ""}
                      {v.status == -1 ? "已到期" : ""}
                      {v.status == 6 ? "未开启" : ""}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mask" style={{ display: show == true ? "block" : "none" }}>
          <div className="modale">
            <div className="contenter" style={{ position: 'relative', top: "0", paddingBottom: ".3rem" }}>
              <div className="modale-title">
                <div>
                  开启{buy.name}酿酒坊
                  </div>
                {/* <div>花费<span style={{ color: "red" }}>{buy.price ? buy.price : "0"}</span></div> */}
              </div>
              {/* <div className="modale-contente" >
                <div>
                  <span>请输入密码:</span> <input ref="psd" type="password" placeholder="密码" />
                </div>
              </div> */}
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

export default Brew;
