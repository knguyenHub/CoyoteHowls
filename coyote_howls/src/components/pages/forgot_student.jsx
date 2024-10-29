import React from 'react'
import './new_account.css';
import { Link } from 'react-router-dom';


const Forgot_student = () => {
  return (
    <div className="login-body">
    <h1 className="login-title">Recover Password</h1>

    <div className="login-form">
      <input type="text" placeholder="Email" className="input-field" />


      <button className="login-button">Confirm</button>
    </div>
  </div>
  )
}

export default Forgot_student
