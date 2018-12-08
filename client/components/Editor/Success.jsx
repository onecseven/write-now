import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"


let handler = () => {
  store.editor.saveSuccess(store.editor.document)
}

const Success = () => {
  if (!store.auth.isLoggedIn) return null
  return (
    <div>
      <button className={"btn is-primary"}onClick={handler}>Save💾</button>
    </div>
  )
}

export default view(Success)
