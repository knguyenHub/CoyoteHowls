import React from 'react'
import './Student_login.css';


const Student_login = () => {
  return (
    <div className="login-body">
    <h1 className="login-title">Student Login</h1>

    <div className="login-form">
      <input type="text" placeholder="Email" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />

      <div className="login-options">
        <a href="/" className="link">New Student?</a>
        <a href="/" className="link">Forgot Password?</a>
      </div>

      <button className="login-button">Login</button>
    </div>
  </div>
  )
}

export default Student_login