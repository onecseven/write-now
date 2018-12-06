import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"

const Item = ({ date, document, title, index }) => {
  if (!document) return null
  return (
    <div key={index}>
      <span>{date}</span>
      <span>
        {title}
        <button
          onClick={() => {
            store.archive.data[index].view = !store.archive.data[index].view
          }}
        >
          +
        </button>
      </span>
      {store.archive.data[index].view ? <span className="document">{document}</span> : null}
    </div>
  )
}

export default view(Item)
