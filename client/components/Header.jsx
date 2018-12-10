import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./store"

const Header = () => {
  if (!store.header.message) {
    return null
  } else {
    setTimeout(store.header.wipeHeader, 2000)
    return (
      <div
        style={{
          display: store.vis.header,
          backgroundColor: "black"
        }}
        className={"balloon  unbig" + (store.header.error ? " error" : "")}
      >
        <img src="/icon.jpg" className="exclamation" />
        <p style={{ display: "inline-block" }}>{store.header.message}</p>
      </div>
    )
  }
}
export default view(Header)
