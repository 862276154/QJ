import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import * as user from '../utils/user';
import * as fetchs from '../utils/fetch';
import '../public/css/App.css';

import right from '../public/img/whrtiht-left.png' ;
import rights from '../public/img/rights.png'; 

class Releases extends Component {
  async open_shop() {
    const { history } = this.props
    await user.merchant().then(data => {
        // console.log(data)
        if (data.code == 0) {
            if (data.msg == "审核已通过") {
                history.push("/sub_goods")
            } else {
                Toast.info(data.msg)
            }
        } else {
            history.push("/Storeapplication")
        }
    })
}
  render() {
    const { history } = this.props
    return (
      <div className="res">
        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff",position:'relative' }}>
          <img src={right} onClick={() => history.go(-1)} />
        店铺管理
          </div>
        <div className="user-res-input pwd" style={{width:"100%",borderRadius:0,top:"0"}}>
          <div className="user-content">
            <div className="form"  onClick={this.open_shop.bind(this)} ><span>发布商品</span>  <img src={rights} alt=""/></div>
            <div className="form"  onClick={()=>history.push("/Release")} ><span>管理商品</span>  <img src={rights}/></div>
            <div className="form"  onClick={()=>history.push("/Dgoods")} ><span>发货</span>  <img src={rights}/></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Releases;
