import { store as st } from "react-easy-state"
import archiveStore from "./Archive/archiveStore"
import authStore from "./Auth/authStore"
import {editorStore, clock} from "./Editor/editorStore"


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

store.archive = archiveStore
store.clock = clock
store.editor = editorStore
store.auth = authStore

/**
 * a better way to have done this would have been to represent visibility like this
 * 
 *  visibilityObject = {
 *   name: String
 *   value: ("" || "none")
 *   set visibility(val) => {
 *   if (val){
 *      this.value("")
 *    } else {
 *      this.value ("none")    
 *    }  
 *  }
 *  get visibility() => {
 *    if (this,value) {
 *     return true
 *     } else if (this.value === "none") {
 *      return false
 *      }
 * }
 * }
 * 
 */

store.vis = {
  /**
   * @typedef {String} cssShow "" is visible, "none" not
   */
  header: /**@type {cssShow} */ "",
  auth: /**@type {cssShow} */  "",
  editor: /**@type {cssShow} */   "none",
  archive: /**@type {cssShow} */  "none",
  about: /**@type {cssShow} */  ""
}

/**@function visUpdate
 * @param {String} component name of the component being updated
 * @param {bool} bool whether to show or hide the component
 * @returns 
  */
store.visUpdate = (component, bool) => {
  store.addToHistory("visUpdate", [component, bool])
  if (store.vis.about === ""){
    store.vis.about = "none" //i just realized how confusing this is lmao
  }
  let prop = /**@type {cssShow}  */ bool ? "" : "none"
  switch (component) {
    case "about":
      store.vis.header = prop
      break
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
        store.vis.editor = "none"
      }
      break
    default:
      break
  }
}

store.header = {
  message: /**@type {String|null} */ null,
  error: /**@type {Boolean} */ false,
  /**@function emitHeader
   * @param {String} message
   * @param {Boolean?} err whether the message is an error
   */
  emitHeader: (message, error = false) => {
    store.addToHistory("emitHeader", [{ message, error }])
    if (error) {
      store.header.error = true
    } else if (!error) {
      store.header.error = false
    }
    if (store.vis.header === "") {
      store.header.message = message
      return
    }
    store.visUpdate("header", true)
    store.header.message = message
    return
  },
  wipeHeader: () =>{
    store.addToHistory("wipeHeader")
    store.visUpdate("header", false)
    store.header.message = null
    store.header.error = null
  }
}
store = st(store)

export default store
