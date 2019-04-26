require('fetch-ie8');
import './index.html'
import dva from 'dva'
import { browserHistory } from 'dva/router'

//app 就是 dva 实例，创建实例时 dva 方法可以传入一些参数，如下：

// 1. Initialize
const app = dva({
  history: browserHistory,//history 是给路由用的，默认为 hashHistory，如果想要使用 browserHistory，需要安装 history，然后在 ./src/index.js 引入使用：

////其他以 on 开头的均为钩子函数
  onError(error) {//  effects 和 subscriptions 抛出的错误都会经过 onError 钩子函数，所以可以在 onError 中进行全局错误处理。
    // console.error("app onError -- ", error)
    // /如果需要对某些 effects 进行特殊的错误处理，可以使用 try catch。
  }
})

// 2. Model

app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')

