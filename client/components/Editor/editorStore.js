import store from "./../store"

export let editorStore = {
  /**@func retry resets the state */
  retry: () => {
  store.addToHistory("retry")
  store.editor.userConfDisplay = ""
  store.editor.editorDisplay = "none"
  store.editor.document = ""
  store.editor.editing = false
  store.editor.title = "Title"
  store.editor.wordLimit = 1000 
  store.editor.wordCount = 0
  store.editor.userFailed = false
  store.editor.userSuccess =  false
  store.clock.hasStarted = false
  store.clock.wordTimer = 15
  },
  /**@func success handles success, emits header, stops clock */
  success: () => {
    store.addToHistory("user success", null)
    store.editor.userSuccess = true
    store.header.emitHeader("You did it!")
    store.clock.stop(true)
    return
  },
  /**@param {String} title */
  changeTitle: title  => {
    store.addToHistory("changeTitle", title)
    store.editor.title = title
    return
  },
  /**@func toggleEditing  internal title editing vis updater */
  toggleEditing: () => {
    store.addToHistory("toggleEditing", store.editor.editing)
    store.editor.editing = !store.editor.editing
    return
  },
  /**@param {Number} int */
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
  /**@param {{words: Number}} */
  setEditorConf: ({ words }) => {
    store.addToHistory("setUserConf", { words })
    store.editor.wordLimit = words
    store.editor._toggleView()
  },
  /**@func _toggleView internal vis updated for userConf component */
  _toggleView: () => {
    store.addToHistory("_toggleView", store.editor.userConfDisplay)
    store.editor.userConfDisplay =
      store.editor.userConfDisplay === "none" ? "" : "none"
    store.editor.editorDisplay =
      store.editor.editorDisplay === "none" ? "" : "none"
  },
  /**@param {String} doc */
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
  /**@typedef {String} cssShow can be "" or "none" */
  userConfDisplay: /**@type {cssShow} */ "",
  editorDisplay:  /** @type {cssShow} */  "none",
  document: /** @type {String} */ "",
  editing: /** @type {Boolean} title editing visibility */ false,
  title: /**@type {String} */"Title",
  wordLimit: /**@type {Number} only positive integers please */ 1000, //default
  wordCount: /**@type {Number} */ 0,
  userFailed:/**@type {Boolean} */ false,
  userSuccess: /**@type {Boolean} */ false
}

export let clock = {
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
  /**@param {Boolean} success */
  stop(success = false) {
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