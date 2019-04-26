import React, { Component } from 'react';
import { List, Checkbox, Flex, Toast } from 'antd-mobile';
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch'
import '../public/css/App.css'
import '../public/css/buy.css'
import right from '../public/img/whrtiht-left.png'
import left0 from '../public/img/left0.png'
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
    news_data: ""
  }
 
  async componentDidMount() {

    var { location } = this.props
    const { history } = this.props
    // return
    location.search = location.search.replace("?", "")
    const parsed = queryString.parse(location.search);
    // console.log(parsed)
    var id = parsed.zx_id

    user.zx_lists(id).then(data => {
      // console.log(data)
      this.setState({
        news_data: data.data
      })
    })
    this.setState({
      title: parsed.my
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
  replaces(v) {
    // console.log(v)
    // return;
    if (v) {
      var APIHost = fetchs.APIHost
      let html = v.replace(/\/uploads/g, APIHost + '/uploads')
      // console.log(html)
      return html
    }

  }

  render() {
    const { history } = this.props
    const { title, data, news_data } = this.state
    // console.log(data)
    return (
      <div className="res " style={{backgroundColor:"#fff"}}>
        <div className="res-hader" style={{ backgroundColor: "#fff", color: "#000",position:"relative",borderBottom:"1px solid #e4dfdf",fontSize:".4rem" }}>
          <img src={left0} onClick={() => history.go(-1)} />
          新闻-{news_data.cate_name}
        </div>
        <div className="news-contenter" >
          <div className="news-title">
            <h1>{news_data.title}</h1>
            <p>{news_data.created_time}</p>
          </div>
          <div className="news-conter" dangerouslySetInnerHTML={{ __html: this.replaces(news_data.message) }}></div>
        </div>

      </div>
    );
  }
}

export default MY_buy;
