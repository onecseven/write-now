import React, { Component } from 'react';
import {view} from 'react-easy-state'
import store from './../store'

let words = null;

const UserConf = () => {
  return (    <form className={"pure-form"} style={{display: store.editor.userConfDisplay}}>
  <legend>Configuration</legend>
  <label>Word Count</label>
  <input id="wordCount" type="number" placeholder="1000" value={words} onChange={(e) => {
    words = e.target.value
  }}/>
  <button type="submit" onClick={(event) => {
    event.preventDefault()
    store.editor.setEditorConf({
      words
    })
  }} class="pure-button">
    Go
  </button>
  <br/>
  <button type="cancel" onClick={(event) => {
    event.preventDefault()
    store.editor.setEditorConf({
      words: 1000
    })
  }} class="pure-button">
    Cancel
  </button>
</form>);
}
 
export default view(UserConf);