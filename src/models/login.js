import {login, userInfo, logout,login2} from '../services/login'
import * as fetchs from '../utils/fetch'
import {parse} from 'qs'
import {message} from 'antd'
import 'antd-mobile/dist/antd-mobile.css';

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: false,
    user: {},
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]') //侧边栏菜单打开的keys
  },
  subscriptions: {
    setup ({dispatch}) {
      dispatch({type: 'queryUser'});
      window.onresize = function () {
        dispatch({type: 'changeNavbar'})
      }
    }
  },
  effects: {
    *login ({
      payload
    }, {call, put}) {
      yield put({type: 'showLoginButtonLoading'})
      // console.log("####==@@@=22=");
      // 手动登录

      const data = yield call(login2, parse(payload))
      // console.log("####====",payload);
      
      if (data.statusCode==107) {
        // 存储登录信息
        fetchs.login2(payload)
        //fetchs.login(payload.username,payload.password);
        //fetchs.login(payload.username,payload.password, data.resource.type?data.resource.type:1);
        //window.location.reload();
        yield put({
          type: 'loginSuccess',
          payload: {user: data.resource}
        })
      } else {
        message.info(data.message);
        yield put({
          type: 'loginFail'
        })
      }
    },
    *queryUser ({
      payload
    }, {call, put}) {
      yield put({type: 'showLoading'})
      // 第一次登录
      // console.log("第一次登录")
      const data = yield call(userInfo, parse(payload))
      // console.log("获取用户信息====",data)
      if (data.statusCode==107) {
        yield put({
          type: 'loginSuccess',
          payload: {user: data.resource}
        })
      }
      yield put({type: 'hideLoading'})
    },
    *logout ({
      payload
    }, {call, put}) {
      fetchs.loginOut();
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({
          type: 'logoutSuccess'
        })
      }
    },
    *switchSider ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchSider'
      })
    },
    *changeTheme ({
      payload
    }, {put}) {
      yield put({
        type: 'handleChangeTheme'
      })
    },
    *changeNavbar ({
      payload
    }, {put}) {
      if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'})
      } else {
        yield put({type: 'hideNavbar'})
      }
    },
    *switchMenuPopver ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchMenuPopver'
      })
    }
  },
  reducers: {
    loginSuccess (state, action) {
      console.log(state, action)
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: false
      }
    },
    loginFail (state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false
      }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true
      }
    },
    showLoading (state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    },
    handleNavOpenKeys(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
}
