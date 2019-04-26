import React, { Component } from 'react';
import { List, Checkbox, Flex, Carousel ,Toast} from 'antd-mobile';
import "../public/css/index.css"
import '../public/css/home.css'
import '../public/css/transaction.css'
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import logo from '../public/img/rotate.png'
//search  Sign_in
import search from '../public/img/search.png'
import Sign_in from '../public/img/Sign_in.png'
import right from '../public/img/whrtiht-left.png'
import shop from '../public/img/userimg.png'
// import userimg from '../public/img/userimg.png'
import shop1 from '../public/img/首页_19.png'
import shop2 from '../public/img/首页_22.png'
import shop3 from '../public/img/首页_25.png'
// const AgreeItem = Checkbox.AgreeItem;
var store = require('store');

class transaction_history extends Component {
  state = {
    data: [],
    user_info:""
  }
  async  componentDidMount() {
    var user_info = store.get("user_info")
    // console.log(user_info)
    if (user_info) {
      this.setState({
        user_info: user_info
      })
    }
    var page = 1
    var size = 10
    this.get_deal(page, size)
  }

  async get_deal(page) {
    const { history } = this.props
    await user.buyList(page).then(data => {
      if (data.code == 4) {
        Toast.info(data.msg, 1)
        store.remove("user_infos")
         history.push("/")
      }
      // console.log(data)
      if (data.code == 1) {
        this.setState({
          data: data.data.data ? data.data.data : ""
        })
      }
    })
  }
  to_buy(e) {
    const { history } = this.props
    history.push(`/buy?info=${e}`)
  }



  render() {
    const { history } = this.props
    const { data ,user_info} = this.state
    // console.log(data)
    const app = this
    return (
      <div className="res tsc ">
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
        .am-carousel-wrap{
          margin-bottom: 24px;
        }
         `}
        </style>

        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff" }}>
                    <img src={right} onClick={() => history.push("/home/transaction")} />
                    交易记录
                </div>
        <div className="transaction" style={{paddingTop:".8rem"}}>
          <div className="tsc-content content">
            <ul className="ul" style={{height:"auto"}}>
              {data.map((v, k) => {
                return (
                  <li key={k}  >
                     <img src={user_info?fetchs.APIHost+ user_info.us_avatar:shop} alt="" />
                    <div className="right">
                      <p><span>购买人 </span>      <span>{ v.bname} </span></p>
                      <p><span>出售人</span>      <span>{v.us_name} </span></p>
                      <p><span>价格</span>      <span>{v.price} <span style={{ color: "red" }}>QDB</span></span></p>
                      <p><span>数量</span>  <span>{v.num}</span></p>
                      <p><span>时间</span>  <span>{v.deal_time}</span></p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default transaction_history;
