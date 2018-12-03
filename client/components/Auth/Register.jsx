import React from "react"
import {view} from "react-easy-state"
import  store from "./../store"

const Register = () => {
  return (
    <form className={"pure-form"}>
      <legend>Register</legend>
      <label for="email">Email</label>
      <input id="emailAuth" type="email" placeholder="Email" />
      <label for="password">Password</label>
      <input id="password" type="password" placeholder="Password" />
      <label for="password">Retype Password</label>
      <input id="password2" type="password" placeholder="Password" />
      <button type="submit" class="pure-button pure-button-primary">
        Register
      </button>
      <button class="pure-button pure-button-primary" onClick={() => store.auth.toggleLoginRegister()}>
        Log in
        </button>
    </form>
  )
}

export default view(Register)
