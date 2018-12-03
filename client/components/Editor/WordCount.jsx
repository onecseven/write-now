import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"

const wordCount = () => {
  const { wordCount, wordLimit } = store.editor
  if (wordCount > wordLimit) {
    store.editor.success()
  }
  return <span>{`${wordCount}/${wordLimit}`}</span>
}

export default view(wordCount)
