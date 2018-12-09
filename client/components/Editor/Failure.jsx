import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"

const Failure = () => {
  return (
    <div>
      <button className={"btn is-error"}onClick={store.editor.retry}>Retry🔄</button>
    </div>
  )
}

export default view(Failure)
s