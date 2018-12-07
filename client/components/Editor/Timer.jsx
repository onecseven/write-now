
import React from 'react'
import { view } from 'react-easy-state'
import store from './../store'


const Timer = () => {
  return (
    <div className="timer container">
    <div>{store.clock.wordTimer}</div>
  </div>
  );
}
 
export default view(Timer);