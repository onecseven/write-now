import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"
import Item from "./Item"
class Month extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
      store.archive.populate()
  }

  render() {
    return (
      <div
        style={{
          display: store.vis.archive
        }}
      >
          {store.archive.data.length > 0 ? 
          store.archive.data.map((doc, index) => {
            const {date, document, title} = doc
            return (
              <Item date={date} document={document} title={title} index={index} /> 
            )
          }) : 
          <div className={"container is-dark"}><p>You don't seem to have any SAVE FILES.</p></div>
          }
      </div>
    )
  }
}

export default view(Month)
