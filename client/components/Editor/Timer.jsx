
import React from 'react'
import { view } from 'react-easy-state'
import store from './../store'
const { wordTimer } = store.clock


const Timer = () => {
  return (
    <div className="timer">
    <div>{wordTimer}</div>
  </div>
  );
}
 
export default view(Timer);