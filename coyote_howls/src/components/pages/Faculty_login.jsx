import React from 'react'
import './Faculty_login.css';


const Faculty_login = () => {
  return (
    <div className="login-body">
    <h1 className="login-title">Faculty Login</h1>

    <div className="login-form">
      <input type="text" placeholder="Email" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />

      <div className="login-options">
        <a href="/" className="link">New Account?</a>
        <a href="/" className="link">Forgot Password?</a>
      </div>

      <button className="login-button">Login</button>
    </div>
  </div>
  )
}

export default Faculty_login
