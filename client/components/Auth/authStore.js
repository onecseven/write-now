export default authStore = {
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