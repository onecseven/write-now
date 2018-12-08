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
    className={"balloon " + (store.header.error ? "error" : "")}
    >
    <h2 style={{textAlign: "center"}}>❗</h2>
    <p>
      {store.header.message}
      </p>
    </div>
    );
  }
}
export default view(Header);