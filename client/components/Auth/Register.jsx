import React from "react"
import {view} from "react-easy-state"
import  store from "./../store"



const Register = () => {
  let email, password
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
    }}>
      <legend>Register</legend>
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
          store.auth.register(email, password)
        }}
      >
        Register
      </button>
    </form>
  )
}

export default view(Register)
