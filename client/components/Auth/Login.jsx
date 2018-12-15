import React from "react"
import store from "./../store"
import { view } from "react-easy-state"


const Login = () => {
  let email, password
  return (
    <div className={"form container is-dark  is-rounded"}>
    <form onSubmit={(e) => {
      e.preventDefault()
    }}>
      <legend >Login</legend>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={e => {
          email = e.target.value
        }}
      />
      <br/>
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
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
    </div>
  )
}

export default view(Login)
