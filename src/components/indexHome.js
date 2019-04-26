import React, { Component } from 'react';
import "../public/css/index.css"
import '../public/css/home.css'
import { Router, Route, Switch, routerRedux, Link } from 'dva/router';
// import { routerRedux, Link } from 'dva/router';
import { connect } from 'react-redux'
import home from './home';
import Makewine from './Makewine';
import transaction from './transaction';
import myCenter from './myCenter';
import homes from '../public/img/home.png'
import jiu from '../public/img/jiu.png'
import jiao from '../public/img/jiao.png'
import my from '../public/img/my.png'
import home1 from '../public/img/home1.png'
import jiu1 from '../public/img/jiu1.png'
import jiao1 from '../public/img/jiao1.png'
import my1 from '../public/img/my1.png'
class IndexHome extends Component {
    componentDidMount() {
        var pathname = this.props.location.pathname
        // console.log(pathname)
        // return
        switch (pathname) {
            case "/home/home":
                this.setState({
                    onsort: 1
                })
                break;
            case "/home/Makewine":
                this.setState({
                    onsort: 2
                })
                break;
            case "/home/transaction":
                this.setState({
                    onsort: 3
                })
                break;
            case "/home/myCenter":
                this.setState({
                    onsort: 4
                })
                break;

            default:
                break;
        }
    }
    onSort(a, e) {
        // 切换路由
        this.setState({
            onsort: a,
        })
    }


    render() {
        const { history } = this.props
        const { lunber } = this.state
        const app = this
        return (
            <div className="IndexHome" style={{overflow:"auto",height:"100%"}}>
                <Route path="/home/home" component={home}></Route>
                <Route path="/home/Makewine" component={Makewine}></Route>
                <Route path="/home/transaction" component={transaction}></Route>
                <Route path="/home/myCenter" component={myCenter}></Route>

                <div className="home footer-nav ">
                    <ul className="ul footer-ul">
                        <li >
                            <Link onClick={this.onSort.bind(this, 1)} to="/home/home">
                                <img src={this.state.onsort == 1 ? home1 : homes} alt="" />
                                <p className={this.state.onsort == 1 ? "updown" : ""}> 首页</p>

                            </Link>
                        </li>

                        <li>
                            <Link onClick={this.onSort.bind(this, 2)} to="/home/Makewine">
                                <img src={this.state.onsort == 2 ? jiu : jiu1} alt="" />
                                <p className={this.state.onsort == 2 ? "updown" : ""}>酿酒坊</p>
                            </Link>
                        </li>
                        <li >
                            <Link onClick={this.onSort.bind(this, 3)} to="/home/transaction">
                                <img src={this.state.onsort == 3 ? jiao1 : jiao} alt="" />
                                <p className={this.state.onsort == 3 ? "updown" : ""}>交易</p></Link>
                        </li>
                        <li >
                            <Link onClick={this.onSort.bind(this, 4)} to="/home/myCenter">
                                <img src={this.state.onsort == 4 ? my1 : my} alt="" />
                                <p className={this.state.onsort == 4 ? "updown" : ""}>我的</p>
                            </Link>
                        </li>
                        
                    </ul>
                </div>

            </div>
        );
    }
}

export default connect()(IndexHome);
