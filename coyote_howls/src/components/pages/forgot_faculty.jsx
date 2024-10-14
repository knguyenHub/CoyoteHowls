import React from 'react'
import './new_account.css';
import { Link } from 'react-router-dom';


const Forgot_faculty = () => {
  return (
    <div className="login-body">
    <h1 className="login-title">New Faculty Login</h1>

    <div className="login-form">
      <input type="text" placeholder="Email" className="input-field" />


      <button className="login-button">Confirm</button>
      <Link to="/faculty"><button className="login-button">back</button></Link>
    </div>
  </div>
  )
}

export default Forgot_faculty
