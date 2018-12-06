import React, { Component } from 'react';
import Register from './Auth/Register.jsx'
import Login from './Auth/Login.jsx'
import { view } from 'react-easy-state'
import store from './store'

class Auth extends Component {
  constructor(props) {
    super(props);
  }
  render() { 
    return (
      <div className='auth' style={{
        "display": store.vis.auth
      }} >
      {store.auth.loginOrRegister === 'login' ? 
      <Login /> : 
      <Register />}
      </div>
    );
  }
}

 
export default view(Auth);