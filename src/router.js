import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic'
import login from './components/login';
import indexHome from './components/indexHome';


const menuGlobal = [
  {
    id: 'aaa',
    pid: '0',
    name: 'aaa页',
    icon: 'user',
    path: '/aaa',
    models: () => [import('./models/aaa')], //models可多个
    component: () => import('./components/aaa'),
  },
  {
    id: 'bbb',
    pid: '0',
    name: 'bbb页',
    icon: 'user',
    path: '/aaa',
    models: () => [import('./models/bbb')], //models可多个
    component: () => import('./components/bbb'),
  },
  {
    id: 'ccc',
    pid: '0',
    name: 'ccc页',
    icon: 'user',
    path: '/ccc',
    models: () => [import('./models/ccc')], //models可多个
    component: () => import('./components/ccc'),
  },
  {
    id: 'res',
    pid: '0',
    name: '注册',
    icon: 'user',
    path: '/res',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/res'),
  },
  {
    id: 'res',
    pid: '0',
    name: '绑定',
    icon: 'user',
    path: '/binding',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/binding'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/Forget_pwd',
    models: () => [import('./models/ccc')], //models可多个
    component: () => import('./components/Forget_pwd'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/shop',
    models: () => [import('./models/ccc')], //models可多个
    component: () => import('./components/shop'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/Sign',
    models: () => [import('./models/ccc')], //models可多个
    component: () => import('./components/Sign'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/Brew',
    models: () => [import('./models/ccc')], //models可多个
    component: () => import('./components/Brew'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/BuyBrew',
    models: () => [import('./models/ccc')], //models可多个
    component: () => import('./components/BuyBrew'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/shopList',
    models: () => [import('./models/ccc')], //models可多个
    component: () => import('./components/shopList'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/Storeapplication',
    models: () => [import('./models/ccc')], //models可多个
    component: () => import('./components/Storeapplication'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/buy',
    models: () => [import('./models/ccc')], //models可多个
    component: () => import('./components/buy'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/MY_buy',
    models: () => [import('./models/ccc')], //models可多个
    component: () => import('./components/MY_buy'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/transaction_history',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/transaction_history'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/Lock_Position',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Lock_Position'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/sub_goods',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/sub_goods'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/details',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/details'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/user_info',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/user_info'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/history',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/history'),
  },
  {
    id: 'res',
    pid: '0',
    name: '忘记密码',
    icon: 'user',
    path: '/history1',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/history1'),
  },
  {
    id: 'res',
    pid: '0',
    name: '我的发布',
    icon: 'user',
    path: '/Release',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Release'),
  },
  {
    id: 'res',
    pid: '0',
    name: '钱包',
    icon: 'user',
    path: '/myWallet',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/myWallet'),
  },
  {
    id: 'res',
    pid: '0',
    name: '钱包',
    icon: 'user',
    path: '/Put_forward',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Put_forward'),
  },
  {
    id: 'res',
    pid: '0',
    name: '钱包',
    icon: 'user',
    path: '/Recharge',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Recharge'),
  },
  {
    id: 'res',
    pid: '0',
    name: '修改密码',
    icon: 'user',
    path: '/Change',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Change'),
  },
  {
    id: 'res',
    pid: '0',
    name: '修改登录',
    icon: 'user',
    path: '/Change_login',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Change_login'),
  },
  {
    id: 'res',
    pid: '0',
    name: '修改支付',
    icon: 'user',
    path: '/Change_pw',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Change_pw'),
  },
  {
    id: 'res',
    pid: '0',
    name: '修改支付',
    icon: 'user',
    path: '/Change_mobel',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Change_mobel'),
  },
  {
    id: 'res',
    pid: '0',
    name: '二维码',
    icon: 'user',
    path: '/QRcode',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/QRcode'),
  },
  {
    id: 'res',
    pid: '0',
    name: '藏酒信息',
    icon: 'user',
    path: '/details_c',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/details_c'),
  }
  ,
  {
    id: 'res',
    pid: '0',
    name: '藏酒信息',
    icon: 'user',
    path: '/Recharge_forward',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Recharge_forward'),
  }
  ,
  {
    id: 'res',
    pid: '0',
    name: '期待',
    icon: 'user',
    path: '/CustomLink',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/CustomLink'),
  }
  ,
  {
    id: 'res',
    pid: '0',
    name: '搜索',
    icon: 'user',
    path: '/search',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/search'),
  }
  ,
  {
    id: 'res',
    pid: '0',
    name: '搜索',
    icon: 'user',
    path: '/Releases',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Releases'),
  }
  ,
  {
    id: 'res',
    pid: '0',
    name: '发货',
    icon: 'user',
    path: '/Dgoods',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Dgoods'),
  },
  {
    id: 'res',
    pid: '0',
    name: '绑定信息',
    icon: 'user',
    path: '/Releases1',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Releases1'),
  }
  ,
  {
    id: 'res',
    pid: '0',
    name: '绑定信息',
    icon: 'user',
    path: '/Storeapplications',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Storeapplications'),
  }
  ,
  {
    id: 'res',
    pid: '0',
    name: '绑定信息',
    icon: 'user',
    path: '/news',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/news'),
  }
  ,
  {
    id: 'res',
    pid: '0',
    name: '用户 收货地址 添加 ',
    icon: 'user',
    path: '/address',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/address'),
  }
  ,
  {
    id: 'res',
    pid: '0',
    name: '用户 收货地址 管理 ',
    icon: 'user',
    path: '/address_gl',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/address_gl'),
  }
  ,
  {
    id: 'res',
    pid: '0',
    name: '账户收益记录' ,
    icon: 'user',
    path: '/Recharge_forwards',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/Recharge_forwards'),
  }
  ,
  {
    id: 'res',
    pid: '0',
    name: '账户收益记录' ,
    icon: 'user',
    path: '/sub_Appeal',
    models: () => [import('./models/res')], //models可多个
    component: () => import('./components/sub_Appeal'),
  }
  // Recharge_forwards sub_Appeal
];
function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        {
          menuGlobal.map(({ path, ...dynamics }, index) => (
            <Route
              key={index}
              path={path}
              exact
              component={dynamic({
                app,
                ...dynamics
              })}
            />
          ))
        }
        <Route path="/" exact component={login} />
        <Route path="/home" component={indexHome}>
        
        </Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
