import React, { Component } from 'react';
import logo from '../public/css/logo.svg';
// import '././App.css';
// import '././login.css';
import '../public/css/App.css'
import '../public/css/login.css'
import { Button, WhiteSpace } from 'antd-mobile';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

      <Button>default</Button><WhiteSpace />
      </div>
    );
  }
}

export default App;
