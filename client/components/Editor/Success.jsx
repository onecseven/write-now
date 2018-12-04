import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"
const Success = ({ document }) => {
  return (
    <div>
      <button onClick={(e) => {
        store.server
      }}>Save</button>
    </div>
  )
}

export default view(Success)
