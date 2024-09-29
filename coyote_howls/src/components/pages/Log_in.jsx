import React from 'react'; // Assuming Navbar is in the same directory
import './Log_in.css'; // Assuming you have a CSS file for styles
import { Link } from 'react-router-dom';

const Log_in = () => {

    return (
    <div>

      {/* Login Header */}
      <div className="login-header">
        <h1>Login</h1>
      </div>

      {/* Main Content */}
      <div className="login-content">
        <h2>Who Are You?</h2>
        <div className="button-container">
          <button><Link to= "/faculty" className="role-button">Faculty</Link></button>
          <button className="role-button">Student</button>
        </div>
      </div>
    </div>
  )
}

export default Log_in