import { store as st } from "react-easy-state"
import * as axios from 'axios'
/**
 * type history
 * tuple: [a, b]
 * a: Function Name,
 * b: arguments
 */

const hasWhitespace = string => {
  if (string.match(/\s/g)) return true
  return false
}

let histItem = function(name, ...args) {
  let q = {
    timestamp: new Date(),
    name: name,
    args: [...args]
  }
  return q
}

let store = st({
  // server: {
  /**
   * TODO LIST:
   * 0. login
   * 1. send method
   *   .1a add send content to server button []
   *   .1b send calendar content to server function []
   *   .1c handle calendar content on server & db []
   * 2. get method
   *   2a. get calendar
   *      * only when logged in
   *   2b. populate store.archive
   * 3. once a day methods
   *   ?? ?? ??
   *   ?? ?? ??
   *   ?? ?? ??
   *
   */
  // },
  clock: {
    hasStarted: false,
    wordTimer: 15,
    start() {
      store.addToHistory("clock.start")
      store.clock.hasStarted = true
      store.clock.wordInterval = setInterval(() => {
        store.clock.wordTimer--
        if (!store.clock.wordTimer) {
          store.clock.stop()
        }
      }, 500)
    },
    stop(success=null) {
      store.addToHistory("clock.stop")
      store.clock.wordInterval = clearInterval(store.clock.wordInterval)
      if (!success) {
        store.editor.userFailed = true
      }
    },
    addToWordTimer() {
      store.addToHistory("addToWordTimer")
      store.clock.wordTimer = 15
    }
  },
  history: [],
  editor: {
    success: () => {
      store.addToHistory("user success", null)
      store.clock.stop(true)
    },
    changeTitle: title => {
      store.addToHistory("changeTitle", title)
      store.editor.title = title
      return
    },
    toggleEditing: () => {
      store.addToHistory("toggleEditing", store.editor.editing)
      store.editor.editing = !store.editor.editing
      return
    },
    updateWordCount: int => {
      store.addToHistory("UpdateWordCount", int)
      store.editor.wordCount = int
      if (store.clock.hasStarted === false) {
        store.clock.start()
      }
      return
    },
    setEditorConf: ({ words }) => {
      store.addToHistory("displayUserConf", { words })
      store.editor.wordLimit = words
      store.editor._toggleView()
    },
    _toggleView: () => {
      store.addToHistory("_toggleView", store.editor.userConfDisplay)
      store.editor.userConfDisplay =
        store.editor.userConfDisplay === "none" ? "" : "none"
      store.editor.editorDisplay =
        store.editor.editorDisplay === "none" ? "" : "none"
    },
    /**@typedef {String} userConfDisplay can be "" or "none" */
    userConfDisplay: "",
    /** @type userConfDisplay */
    editorDisplay: "none",
    editing: false,
    title: "Title",
    wordLimit: 1000, //default
    wordCount: 0,
    userFailed: false
  },
  auth: {
    toggleLoginRegister: () => {
      store.addToHistory("toggleLoginRegister", store.auth.loginOrRegister)
      store.auth.loginOrRegister = "register"
      return
    },
    login: (email, password) => {
      store.addToHistory("login", email)
      axios.post('/login', {email, password})
      .then(({status, _id}) => {
        if (status === 200) {
        store.addToHistory("login sucesss", _id)
        store.auth._id = _id
        store.auth.isLoggedIn = true
        }
      }) 
      .catch(err => {
        store.addToHistory("login failure", err)
        // handleError
        // maybe UI thing?
      }) 
    },
    loginOrRegister: "login",
    _id: null,
    isLoggedIn: false
  },
  addToHistory: (func, ...args) => {
    let temp = histItem(func, ...args)
    store.history.push(temp)
  },
  archive: {}
})

export default store
