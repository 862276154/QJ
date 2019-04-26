// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
import dva from 'dva';
// import './index.css';
import 'antd-mobile/dist/antd-mobile.css'; 
import createHistory from 'history/createBrowserHistory'
 
// 1. Initialize
const app = dva({
    history:createHistory()
});
 
// 2. Plugins
// app.use({});
 
// 3. Model
app.model(require('./models/app').default);
 
// 4. Router
app.router(require('./router').default);
 
// 5. Start
app.start('#root');
 
