import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./store"

const Navbar = () => {
  return (
    <ul className="navbar">
      <li>WRITE NOW 🔔</li>
      {store.auth.isLoggedIn ? (
        <li
          onClick={e => {
            store.visUpdate("editor", false)
            store.visUpdate("archive", true)
          }}
        >
          ARCHIVE
        </li>
      ) : (
        <li
          onClick={e => {
            store.visUpdate("auth", true)
          }}
        >
          LOGIN
        </li>
      )}
    </ul>
  )
}

export default view(Navbar)
