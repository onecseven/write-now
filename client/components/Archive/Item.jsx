import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"

const Item = ({ date, document, title, index }) => {
  if (!document) return null
  return (
    <div className={"container with-title"} key={index}>
      <span className="title">
        {title}
      </span>
      <span>{date}</span>
        <button className="btn"
          onClick={() => {
            store.archive.data[index].view = !store.archive.data[index].view
          }}
        >
          +
        </button>
      {store.archive.data[index].view ? <span className="document">{document}</span> : null}
    </div>
  )
}

export default view(Item)
