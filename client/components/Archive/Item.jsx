import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteStr: "Delete",
      really: false,
      selfDestruct: false
    }
    this.handler = () => {
      let { really, deleteStr, selfDestruct } = this.state
      if (!really) {
        this.setState({
          really: true,
          deleteStr: "Are you sure?"
        })
      } else if (really) {
        store.archive.delete(this.props.index)
        this.setState({
          selfDestruct: true,
          deleteStr: "Delete",
          really: false
        })
      }
    }
  }
  render() {
    if (!this.props.document) return null
    return this.state.selfDestruct ? null : (
      <div className={"container with-title"} key={this.props.index}>
        <span className="title">{this.props.title}</span>
        <span>{this.props.date}</span>
        <button
          className="btn"
          onClick={() => {
            store.archive.data[this.props.index].view = !store.archive.data[
              this.props.index
            ].view
          }}
        >
          Show
        </button>
        <button className="btn is-error" onClick={this.handler}>
          {this.state.deleteStr}
        </button>
        {store.archive.data[this.props.index].view ? (
          <span className="document">{this.props.document}</span>
        ) : null}
      </div>
    )
  }
}

export default view(Item)
