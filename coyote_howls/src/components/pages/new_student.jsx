import React from 'react'
import './new_account.css';


const New_student = () => {
  return (
    <div className="login-body">
    <h1 className="login-title">Create Student Account</h1>

    <div className="login-form">
      <input type="text" placeholder="Name" className="input-field" />
      <input type="text" placeholder="Email" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />


      <button className="login-button">Create</button>
    </div>
  </div>
  )
}

export default New_student
