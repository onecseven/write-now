import { store as st } from "react-easy-state"
import * as axios from "axios"
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
  let obj = {
    timestamp: new Date().toUTCString(),
    name: name,
    args: [...args]
  }
  return obj
}

// const handler = {
//   get: function(target, propKey, receiver) {
//     const origMethod = target[propKey]
//     if (typeof origMethod === "function" && propKey !== 'addToHistory') {
//       return function(...args) {
//         target.addToHistory(propKey, ...args)
//         return Reflect.get(target, propKey, receiver)
//       }
//     } else {
//       return Reflect.get(target, propKey, receiver)
//     }
//   },
//   set: function(obj, prop, value) {
//     let orig = obj[prop]
//     obj.addToHistory(
//       `Changing property "${String(prop)}" from {${String(orig)}} to {${String(
//         value
//       )}}`
//     )
//     return Reflect.set(obj, prop, value)
//   }
// }

let store = {
  history: [],
  addToHistory: (func, ...args) => {
    let temp = histItem(func, ...args)
    store.history.push(temp)
  }
}
store.clock = {
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
  stop(success = null) {
    store.addToHistory("clock.stop")
    store.clock.wordInterval = clearInterval(store.clock.wordInterval)
    if (!success) {
      store.editor.userFailed = true
      store.header.emitHeader("clock stopped")
    }
  },
  addToWordTimer() {
    store.addToHistory("addToWordTimer")
    store.clock.wordTimer = 15
  }
}
store.history = []
store.editor = {
  success: () => {
    store.addToHistory("user success", null)
    store.editor.userSuccess = true
    store.header.emitHeader("You did it!")
    store.clock.stop(true)
    return
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
    if (store.clock.hasStarted === false && store.editor.wordCount > 0) {
      store.clock.start()
    }
    if (int >= store.editor.wordLimit && !store.editor.userSuccess) {
      store.editor.success()
    }
    return
  },
  setEditorConf: ({ words }) => {
    store.addToHistory("setUserConf", { words })
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
  saveSuccess: doc => {
    store.addToHistory("saveSuccess", doc)

    axios
      .post("/calendar", {
        doc: doc,
        title: store.editor.title
      })
      .then(res => store.header.emitHeader("saved!"))
      .catch(err => store.header.emitHeader("problem saving", true))
  },
  /**@typedef {String} userConfDisplay can be "" or "none" */
  userConfDisplay: "",
  /** @type userConfDisplay */
  editorDisplay: "none",
  document: "",
  editing: false,
  title: "Title",
  wordLimit: 1000, //default
  wordCount: 0,
  userFailed: false,
  userSuccess: false
}
store.auth = {
  toggleLoginRegister: () => {
    store.addToHistory("toggleLoginRegister", store.auth.loginOrRegister)
    store.auth.loginOrRegister = "register"
    return
  },
  login: (email, password) => {
    store.addToHistory("login", email)
    axios
      .post("/login", { email, password })
      .then(({ status, _id }) => {
        if (status === 200) {
          store.addToHistory("login sucesss", _id)
          store.header.emitHeader("Login Success!")
          store.visUpdate("auth", false)
          store.visUpdate("editor", true)
          store.auth._id = _id
          store.auth.isLoggedIn = true
        }
      })
      .catch(err => {
        store.addToHistory("login failure", err)
        store.header.emitHeader("Failed to login", true)
      })
  },
  register: (email, password) => {
    store.addToHistory("register", [email, password])
    axios
      .post("/user", { email, password })
      .then(e => {
        store.header.emitHeader("Registered!")
        store.auth.login(email, password)
      })
      .catch(err => {
        console.error(err)
        store.header.emitHeader("Error registering!", true)
      })
  },
  loginOrRegister: "login",
  _id: null,
  isLoggedIn: false
}
store.archive = {
  delete: index => {
    axios
      .post("/delete", { index })
      .then(e => {
        store.header.emitHeader("Item deleted.")
        store.archive.data = store.archive.data.filter((v,i) => i !== index)
      })
      .catch(err => store.emitHeader("Error updating document."))
  },
  populate: () => {
    if (!store.auth.isLoggedIn) return
    store.addToHistory("archive populate")
    axios
      .get("/calendar")
      .then(({ data }) => {
        store.archive.time = 30
        data.forEach(item => {
          item.view = false
          store.archive.data.push(item)
        })
      })
      .catch(err => {
        console.error(err)
        store.header.emitHeader("Error recovering your archive.")
      })
  },
  data: []
}
store.vis = {
  header: "",
  auth: "",
  editor: "none",
  archive: "none"
}
store.visUpdate = (component, bool) => {
  let show = ""
  let hide = "none"
  let prop = bool ? show : hide
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
