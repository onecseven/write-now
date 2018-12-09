export default archiveStore = {
    /**
     * @function delete deletes a document from the current user's archive
     * @param {Number} index index of the document to be deleted
     */
    delete: index => {
      store.addToHistory("archive delete", index)
      axios
        .post("/delete", { index })
        .then(() => {
          store.addToHistory("archive deleted")
          store.header.emitHeader("Item deleted.")
          store.archive.data = store.archive.data.filter((v,i) => i !== index)
        })
        .catch(err => {
          store.addToHistory("archive delete unsuccessful", err)
          store.emitHeader("Error updating document.")})
    },
    /**@function populate populates the archive data store
     */
    populate: () => {
      if (!store.auth.isLoggedIn) return
      store.addToHistory("archive populate")
      axios
        .get("/calendar")
        .then(({ data }) => {
          store.addToHistory("archive populated", data)
          data.forEach(item => {
            item.view = false
            store.archive.data.push(item)
          })
        })
        .catch(err => {
          store.addToHistory("archive not populated", err)
          store.header.emitHeader("Error recovering your archive.")
        })
    },
    /**
     * @type {Array} of document objects for the current user 
     */
    data: []
  }
