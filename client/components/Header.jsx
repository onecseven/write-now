import React, { Component } from 'react';
import {view} from 'react-easy-state'
import store from './store'

const Header = () => {
  if (!store.header.message){
    return null
  } else {
  return (
    <div style={{
      "display": store.vis.header
    }} 
    className={"header " + (store.header.error ? "error" : "")}
    >
      {store.header.message}
    </div>
    );
  }
}
export default view(Header);