import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"

let words = null

const UserConf = () => {
  return (
    <form
      className={"pure-form"}
      style={{ display: store.editor.userConfDisplay }}
    >
      <legend>Set a minimum word count</legend>
      <h1 style={{color: "red"}}>YOU WILL NOT BE ABLE TO SAVE BEFORE YOU HIT THAT NUMBER</h1>
      <label>Word Count</label>
      <input
        id="wordCount"
        type="number"
        placeholder="1000"
        value={words}
        onChange={e => {
          words = e.target.value
        }}
      />
      <button
        type="submit"
        onClick={event => {
          event.preventDefault()
          store.editor.setEditorConf({
            words
          })
        }}
        class="pure-button"
      >
        Go
      </button>
      <br />
    </form>
  )
}

export default view(UserConf)
