import React, { Component } from "react"
import Editor from "./components/Editor"
import Header from "./components/Header"
import { view } from 'react-easy-state'
import store from './components/store'
class App extends Component {
  constructor() {
    super()
    this.state = store
  }
  render() {
    return (
      <div className="App">
        <Header/>
        <Editor/>
      </div>
    )
  }
}


export default view(App)