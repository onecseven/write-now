import React, { Component } from "react"
import { view } from "react-easy-state"
import DraftContainer from "./Editor/DraftContainer"
import Title from "./Editor/Title"
import UserConf from "./Editor/UserConf"
import Success from "./Editor/Success"
import Timer from "./Editor/Timer"
import store from "./store"
class Editor extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div
        style={{
          display: store.vis.editor
        }}
      >
        <UserConf />
        <div style={{ display: store.editor.editorDisplay }}>
          <div className={"container with-title is-rounded"}>
            <Title className="title upper" />
            {store.editor.userSuccess ? (
              <Success />
            ) : (
              <Timer className={"upper"} />
            )}
            <DraftContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default view(Editor)
