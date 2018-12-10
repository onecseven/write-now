import React, { Component } from "react"
import { view } from "react-easy-state"
import DraftContainer from "./Editor/DraftContainer"
import Title from "./Editor/Title"
import UserConf from "./Editor/UserConf"
import Success from "./Editor/Success"
import Failure from "./Editor/Failure"
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
          <div className={"container is-dark with-title is-rounded"}>
            <Title className="title upper" />
            {store.editor.userSuccess ? 
              (<Success />)
             : 
              (store.editor.userFailed ? 
                (<Failure/>) : 
                null)
            }
            <DraftContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default view(Editor)
