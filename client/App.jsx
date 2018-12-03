import React, { Component } from "react"
import Auth from "./components/Auth"
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
        <Editor/>
      </div>
    )
  }
}


export default view(App)