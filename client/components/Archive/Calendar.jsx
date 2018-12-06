import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"
import Item from "./Item"
class Month extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    if (store.archive.data.length < 1){
      store.archive.populate()
    }
  }

  render() {
    return (
      <div
        style={{
          display: store.vis.archive
        }}
      >
          {store.archive.data.map((doc, index) => {
            const {date, document, title} = doc
            return (
              <Item date={date} document={document} title={title} index={index} /> 
            )
          })}
      </div>
    )
  }
}

export default view(Month)
