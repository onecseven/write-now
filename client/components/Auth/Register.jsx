import React from "react"
import {view} from "react-easy-state"
import  store from "./../store"



const Register = () => {
  let email, password
  return (
    <form
    className={"form container with-title"}

     onSubmit={(e) => {
      e.preventDefault()
    }}>
      <legend
          className={"title"}

      >Register</legend>
      <label>Email</label>
      <input
              className={"input"}
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
        className={"input"}
        placeholder="Password"
        value={password}
        onChange={e => {
          password = e.target.value
        }}
      />
      <button
          className={"btn is-primary"}

        onClick={e => {
          e.preventDefault()
          store.auth.register(email, password)
        }}
      >
        Register
      </button>
    </form>
  )
}

export default view(Register)
