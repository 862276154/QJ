module.exports = [
  {
    key: 'dashboard',
    name: '仪表盘',
    icon: 'laptop'
  },
  {
    key: 'admins',
    name: '管理员',
    icon: 'user'
  },{
    key: 'user',
    name: '会员管理',
    icon: 'team',
    clickable: false,
    child: [
      {
        key: 'addUsers',
        name: '添加会员'
      },
    {
        key: 'users',
        name: '会员列表'
      },
      ,
    {
        key: 'addexcel',
        name: '添加数据库表格'
      }

      // ,
      // {
      //   key: 'merchant',
      //   name: '商户列表'
      // }
      ,{
        key: 'inactive',
        name: '未审核列表'
      }
      //  ,{
      //   key: 'demo',
      //   name: '会员图谱'
      //  }
    ]
  },
  {
    key: 'product',
    name: '商品管理',
    icon: 'shopping-cart',
    clickable: false,
    child: [
      {
        key: 'cropsList',
        name: '商品列表'
      },
      {
        key: 'classification',
        name: '商品分类'
      },
      {
        key: 'addGoods',
        name: '添加商品'
      },
  
      {
        key: 'goods',
        name: '竞拍成功列表'
      },
      {
        key: 'outLine',
        name: '流拍列表'
      },
      // {
      //   key: 'crops',
      //   name: '添加众筹商品'
      // },
      // {
      //   key: 'outGoods',
      //   name: '众筹商品下架列表'
      // },
     
    ]
  },{
    key: 'order',
    name: '订单管理',
    icon: 'file-text',
    clickable: false,
    child: [
      {
        key: 'orderList',
        name: '订单列表'
      },
      // {
      //   key: 'exchange',
      //   name: '参与众筹列表'
      // }
    ]
  },{
    key: 'Apply',
    name: '申请管理',
    icon: 'shopping-cart',
    clickable: false,
    child: [
      /*{
        key: 'merchant',
        name: '申请商户'
      },*/
      {
        key: 'withdrawals',
        name: '申请提现'
      },
    ]
  },{
    key: 'view',
    name: '页面管理',
    icon: 'setting',
    clickable: false,
    child: [
      // {
      //   key: 'addbanner',
      //   name: '添加广告'
      // },
      {
        key: 'addbanners',
        name: '添加轮播图'
      },
      // {
      //   key: 'bannerList',
      //   name: '广告位列表'
      // },
      {
        key: 'addArticle',
        name: '添加文章'
      },
      {
        key: 'articleList',
        name: '文章列表'
      },
      
    ],
    
  },
  {
    key: 'smg',
    name: '公告管理',
    icon: 'notification',
    clickable: false,
    child: [
      {
        key: 'addSmg',
        name: '添加系统信息'
      },
      // {
      //   key: 'smgs',
      //   name: '公告列表'
      // },
    ]
  },
  {
    key: 'caiwu',
    name: '平台收益记录',
    icon: 'pay-circle-o',
    clickable: false,
    child: [
      {
        key: 'Profit',
        name: '商品收益'
      },
      /*
      {
        key: 'chongzhi',
        name: '充值记录'
      },
   
      {
        key: 'htchongzhi',
        name: '后台充值记录'
      },
      {
        key: 'htkouchu',
        name: '后台扣除记录'
      },
      {
        key: 'financialflow',
        name: '流水记录'
      },
      {
        key: 'allstatistics',
        name: '总体情况'
      },
      {
        key: 'tixian',
        name: '提现列表'
      },
      {
        key: 'goumai',
        name: '购买饲料记录'
      },
      {
        key: 'bobi',
        name: '每日拨比'
      },*/
    ]
  },
  /*
  {
    key: 'tans',
    name: '交易管理',
    icon: 'sync',
    clickable: false,
    child: [
      {
        key: 'tansList',
        name: '交易列表'
      },{
        key: 'activationCode',
        name: '激活码交易记录'
      }
      {
        key: 'shifei',
        name: '挂单记录'
      },
      {
        key: 'huzhuan',
        name: '互转记录'
      }
    ]
  },*/
  /*{
    key: 'gongxiang',
    name: '共享记录',
    icon: 'inbox'
  },*/
  /*{
    key: 'product',
    name: '商品管理',
    icon: 'shopping-cart',
    clickable: false,
    child: [
      {
        key: 'crops',
        name: '添加商城产品'
      },
      {
        key: 'cropsList',
        name: '商城产品列表'
      },
    ]
  },

  */
  {
    key: 'systemSet',
    name: '系统参数',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'baseSet',
        name: '系统基本参数'
      }
      // ,{
      //   key: 'beast',
      //   name: '关于我们',
      // }
      
      /*,{
        key: 'bossaward',
        name: '领导奖'
      },{
        key: 'gameSet',
        name: '游戏概率设置'
      },
      {
        key: 'jinSet',
        name: '直推奖励参数'
      },*/
    ]
  },
  /*{
    key: 'feedback',
    name: '用户反馈',
    icon: 'message',
    clickable: false,
    child: [
      {
        key: 'feedbacks',
        name: '反馈信息列表'
      },
    ]
  }*/
]
