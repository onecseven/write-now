import React, { Component } from 'react';
import {view} from 'react-easy-state'
import DraftContainer from './Editor/DraftContainer'
import Title from './Editor/Title'
import UserConf from "./Editor/UserConf"
import Timer from './Editor/Timer'
import store from './store'
class Editor extends Component {
  constructor(props) {
    super(props);
  }
  render() { 
    return (
      <div>
        <UserConf/>
        <div style={{display: store.editor.editorDisplay}}>
        <Title/>
        <Timer/>
        <DraftContainer/>
        </div>
      </div>
    );
  }
}
 
export default view(Editor);