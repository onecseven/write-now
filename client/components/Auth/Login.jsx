import React from "react"
import store from "./../store"
import { view } from "react-easy-state"

let email, password

const Login = () => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
    }}>
      <legend>Login</legend>
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
        onClick={e => {
          e.preventDefault()
          store.auth.login(email, password)
        }}
      >
        Sign in
      </button>
      <button
        // onClick={() => store.auth.toggleLoginOrRegister()}
      >
        Register
      </button>
    </form>
  )
}

export default view(Login)
