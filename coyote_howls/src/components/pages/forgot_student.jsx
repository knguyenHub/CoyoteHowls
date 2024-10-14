import React from 'react'
import './new_account.css';


const Forgot_student = () => {
  return (
    <div className="login-body">
    <h1 className="login-title">New Student Login</h1>

    <div className="login-form">
      <input type="text" placeholder="Email" className="input-field" />


      <button className="login-button">Confirm</button>
    </div>
  </div>
  )
}

export default Forgot_student
