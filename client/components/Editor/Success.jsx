import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"


const Success = ({ doc }) => {
  let handler = () => {
    store.editor.saveSuccess(doc)
  }
  return (
    <div>
      <button onClick={handler}>Save</button>
    </div>
  )
}

export default view(Success)
