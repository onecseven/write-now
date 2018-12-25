import React from "react"
import { view } from "react-easy-state"
import store from "./../store"

const Register = () => {
  let email, password
  return (
    <div className={"form container is-dark is-rounded"}>
      <form
        className="spaced"
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <legend>Register</legend>
        <label>Email</label>
        <br/>
        <input
          className={"input"}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => {
            email = e.target.value
          }}
        />
        <br/>
        <label>Password</label>
        <br/>
        <input
          type="password"
          className={"input"}
          placeholder="Password"
          value={password}
          onChange={e => {
            password = e.target.value
          }}
        />
        <br/>
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
    </div>
  )
}

export default view(Register)
