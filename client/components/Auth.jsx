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
      <div className='auth'>
      {store.auth.loginOrRegister === 'login' ? 
      <Login /> : 
      <Register />}
      </div>
    );
  }
}

 
export default view(Auth);