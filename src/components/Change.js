import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import '../public/css/App.css'
import * as user from '../utils/user'
import right from '../public/img/whrtiht-left.png' 
import rights from '../public/img/rights.png' 
class Change extends Component {
  render() {
    const { history } = this.props
    return (
      <div className="res">
        <div className="res-hader" style={{ backgroundColor: "#44041D", color: "#fff" }}>
          <img src={right} onClick={() => history.go(-1)} />
        安全设置
          </div>
        <div className="user-res-input pwd" style={{width:"100%",borderRadius:0,top:".8rem"}}>
          <div className="user-content">
            <div className="form"  onClick={()=>history.push("/Change_login")} ><span>修改登录密码</span>  <img src={rights} alt=""/></div>
            <div className="form"  onClick={()=>history.push("/Change_pw")} ><span>修改支付密码</span>  <img src={rights}/></div>
            <div className="form"  onClick={()=>history.push("/Change_mobel")} ><span>修改手机号</span>  <img src={rights}/></div>
           
          </div>
        </div>
      </div>
    );
  }
}

export default Change;
