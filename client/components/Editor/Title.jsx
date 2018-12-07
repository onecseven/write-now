import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"

const handleEvent = e => {
  switch (e.type) {
    case "change":
      store.editor.changeTitle(e.target.value)
      break
    case "blur": 
      store.editor.toggleEditing()
      break
    case "click":
      store.editor.toggleEditing()
      break
    default:
      break
  }
}

const Title = () => {
  return (
    <div>
      {store.editor.editing ? (
        <input
          type="text"
          onChange={handleEvent}
          placeholder={store.editor.title}
          onBlur={handleEvent}
        />
      ) : (
        <h1 className={"title"} onClick={handleEvent}>{store.editor.title}</h1>
      )}
    </div>
  )
}

export default view(Title)
