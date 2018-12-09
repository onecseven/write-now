export let editorStore = {
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
  editorDisplay:  /** @type {userConfDisplay} */  "none",
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