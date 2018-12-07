import React from "react"
import store from "./../store"
import { view } from "react-easy-state"


const Login = () => {
  let email, password
  return (
    <form className={"container with-title"}onSubmit={(e) => {
      e.preventDefault()
    }}>
      <legend className={"title"}>Login</legend>
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => {
          email = e.target.value
        }}
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => {
          password = e.target.value
        }}
      />
      <button
      className={"btn"}
        onClick={e => {
          e.preventDefault()
          store.auth.login(email, password)
        }}
      >
        Sign in
      </button>
      <button
            className={"btn"}

        onClick={() => store.auth.toggleLoginRegister()}
      >
        Register
      </button>
    </form>
  )
}

export default view(Login)
