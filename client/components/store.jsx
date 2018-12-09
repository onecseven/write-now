import { store as st } from "react-easy-state"
import archiveStore as archive from "./Archive/archiveStore"
import authStore as auth from "./Auth/authStore"
import {editorStore as editor, clock} from "./Editor/editorStore"
import * as axios from "axios"


/**
 * @function hasWhitespace checks whether the passed string has whitescpace
 * @param {String}
 * @returns {boolean}
 */
const hasWhitespace = string => {
  if (string.match(/\s/g)) return true
  return false
}

/**
 * @typedef {{Object}} histItem 
 * @property {String} timestamp logging time
 * @property {String} name the name of the function being logged
 * @property  {Array?} args the arguments passed to the function
 */

 /**
  * @class
  * @param {String} name
  * @param {String[]?} args
  */

class histItem {
  constructor(name, ...args){
    this.timestamp = new Date().toUTCString()
    this.name = name
    this.args = [...args]
  }
}
let store = {
  history: /**@type {{histItem[s]}} */ [],
  /**
   * @function addToHistory internal logger
   * @param {String} func function name
   * @param {Array?} args arguments passed to the function
   * @returns {void}
   */
  addToHistory: (func, ...args) => {
    let temp = new histItem(func, ...args)
    store.history.push(temp)
  }
}

store.archive = {
  archive
}
store.clock = {
  clock
}
store.editor = {
  editor
}
store.auth = {
  auth
}

store.vis = {
  /**
   * @typedef {String} cssShow "" is visible, "none" not
   */
  header: /**@type {cssShow} */ "",
  auth: /**@type {cssShow} */  "",
  editor: /**@type {cssShow} */   "none",
  archive: /**@type {cssShow} */  "none"
}

/**@function visUpdate
 * @param {String} component name of the component being updated
 * @param {bool} bool whether to show or hide the component
 * @returns 
  */
store.visUpdate = (component, bool) => {

  let prop = /**@type {cssShow}  */ bool ? "" : "none"
  switch (component) {
    case "header":
      store.vis.header = prop
      if (!bool) {
        store.header.message = null
        store.header.error = null
      }
      break
    case "auth":
      store.vis.auth = prop
      break
    case "editor":
      store.vis.editor = prop
      break
    case "archive":
      store.vis.archive = prop
      store.archive.populate()
      if (bool) {
        store.vis.editor = hide
      }
      break
    default:
      break
  }
}

store.header = {
  message: null,
  error: null,
  emitHeader: (message, error = null, time = 2000) => {
    store.addToHistory("emitHeader", [{ message, error, time }])
    if (error) {
      store.header.error = true
    }
    if (store.vis.header === "") {
      store.header.message = message
      return
    }
    store.visUpdate("header", true)
    store.header.message = message
    setTimeout(() => {
      store.visUpdate("header", false)
    }, time)
  }
}
store = st(store)

export default store
