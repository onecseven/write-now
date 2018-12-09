import React from "react"
import { Editor, EditorState, convertToRaw, ContentState } from "draft-js"
import { view } from "react-easy-state"
import store from "./../store"
import Success from "./Success"

const getWordCount = editorState => {
  const plainText = editorState.getCurrentContent().getPlainText("")
  const regex = /(?:\r\n|\r|\n)/g // new line, carriage return, line feed
  const cleanString = plainText.replace(regex, " ").trim() // replace above characters w/ space
  const wordArray = cleanString.match(/\S+/g) // matches words according to whitespace
  return wordArray ? wordArray.length : 0
}

// const plainTextArray = editorState.getCurrentContent().getPlainText("").match(/\S+/g)

class DraftContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      wordCount: 0
    }
    this.setDomEditorRef = ref => (this.domEditor = ref)
    //somehow this gives us the dom element
    this.onChange = editorState => {
      this.setState({ editorState }, () => {
        let currentWordCount = getWordCount(this.state.editorState)
        store.editor.updateWordCount(currentWordCount)
        if (currentWordCount > this.state.wordCount) {
          store.clock.addToWordTimer()
        }
        this.setState({ wordCount: currentWordCount })
        store.editor.document = editorState.getCurrentContent().getPlainText("")
      })
    }
  }
  componentDidMount() {
    this.domEditor.focus()
    if ((store.editor.userFailed === true)) {
      this.setState({ editorState: EditorState.createEmpty() })
    }
  }
  render() {
    return (
      <div id="content" className="container">
        <span className={store.editor.userFailed ? "error" : ""}>{`${
          store.editor.wordCount
        }/${store.editor.wordLimit}`}</span>
        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref={this.setDomEditorRef}
          />
        </div>
      </div>
    )
  }
}

export default view(DraftContainer)
