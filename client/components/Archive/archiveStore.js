import store from "./../store"
import * as axios from "axios"
let archiveStore = {
  /**
   * @function delete deletes a document from the current user's archive
   * @param {Number} index index of the document to be deleted (from archive.data)
   */
  delete: index => {
    store.addToHistory("archive delete", index)
    axios
      .post("/delete", { index })
      .then(() => {
        store.addToHistory("archive deleted")
        store.header.emitHeader("Item deleted.")
        store.archive.data = store.archive.data.filter((v, i) => i !== index)
      })
      .catch(err => {
        store.addToHistory("archive delete unsuccessful", err)
        store.emitHeader("Error updating document.")
      })
  },
  /**@function populate populates the archive data store
   */
  /**
   * @typedef {Object} userDoc
   * @property {String} date
   * @property {String} title
   * @property {String} document
   */
  populate: () => {
    if (!store.auth.isLoggedIn) return
    store.addToHistory("archive populate")
    axios
      .get("/calendar")
      .then(({ data }) => {
        //data: userDoc[]
        store.addToHistory("archive populated", data)
        data.reverse().forEach(item => {
          item.view = false
          store.archive.data.push(item)
        })
      })
      .catch(err => {
        store.addToHistory("archive not populated", err)
      })
  },
  /**
   * @type {Array} of document objects for the current user
   */
  data: [],
  init: false
}

export default archiveStore
