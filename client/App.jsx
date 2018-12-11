import React, { Component } from "react"
import Editor from "./components/Editor"
import Header from "./components/Header"
import Auth from "./components/Auth"
import { view } from 'react-easy-state'
import store from './components/store'
import Navbar from "./components/Navbar";
import Calendar from "./components/Archive/Calendar";
class App extends Component {
  constructor() {
    super()
    this.state = store
    if (sessionStorage.getItem("isLoggedIn")) {
      store.auth.isLoggedIn = true
      store.visUpdate("auth", false)
      store.header.emitHeader("Welcome Back!")
      store.visUpdate("editor", true)
    }
  }
  render() {
    return (
      <div className="App">
        <Navbar/>
        <div className="unstatic">
        <Calendar/>
        <Auth />
        <Editor/>
        </div>
      </div>
    )
  }
}


export default view(App)