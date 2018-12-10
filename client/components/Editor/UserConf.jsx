import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"


const UserConf = () => {
  let words
  return (
    <form
      style={{ display: store.editor.userConfDisplay }}
      className={"form container is-dark"}
    >
      <legend>Set a minimum word count</legend>
      <h2 style={{color: "red"}}>YOU WILL NOT BE ABLE TO SAVE BEFORE YOU HIT THAT NUMBER</h2>
      <input
        id="wordCount"
        type="number"
        className={"input is-success"}
        placeholder="1000"
        value={words}
        style={{display:"inline-block"}}
        onChange={e => {
          words = e.target.value
        }}
      />
      <button
        type="submit"
        style={{display:"inline-block"}}
        onClick={event => {
          event.preventDefault()
          words = words || store.editor.wordCount || 1000
          store.editor.setEditorConf({
            words
          })
        }}
        className="btn is-primary"
      >
        Go
      </button>
      <br />
    </form>
  )
}

export default view(UserConf)
