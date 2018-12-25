import store from "./../store"
import * as axios from "axios"


let authStore = {
  /**@function toggleLoginRegister inner visibility switch for auth component */
  toggleLoginRegister: () => {
    store.addToHistory("toggleLoginRegister", store.auth.loginOrRegister)
    store.auth.loginOrRegister = "register"
    return
  },
  /**@function login logs the user in
   * @param {String} email
   * @param {String} password
   */
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
          store.auth.isLoggedIn = true
          sessionStorage.setItem("isLoggedIn","true")
        }
      })
      .catch(err => {
        store.addToHistory("login failure", err)
        store.header.emitHeader("Failed to login", true)
      })
  },
    /**@function register registers the user
   * @param {String} email
   * @param {String} password
   */
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

export default authStore