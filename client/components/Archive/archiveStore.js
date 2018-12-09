export default archiveStore = {
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
