import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"


const UserConf = () => {
  let words
  return (
    <form
      style={{ display: store.editor.userConfDisplay }}
      className={"form container"}
    >
      <legend>Set a minimum word count</legend>
      <input
        id="wordCount"
        type="number"
        className={"input is-success"}
        placeholder="1000"
        value={words}
        onChange={e => {
          words = e.target.value
        }}
      />
      <br/>
      <button
        type="submit"
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
        <h1 style={{color: "red"}}>YOU WILL NOT BE ABLE TO SAVE BEFORE YOU HIT THAT NUMBER</h1>
    </form>
  )
}

export default view(UserConf)
