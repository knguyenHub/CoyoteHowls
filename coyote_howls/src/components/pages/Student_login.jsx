import React, { useState } from 'react';
import './Faculty_login.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../auth';

const Student_login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      console.log('User logged in:', user);
      navigate('/StudentDashboard');
    } catch (error) {
      console.error('Error logging in user:', error);
      alert(`Failed to log in user: ${error.message}`);
    }
  };

  return (
    <div className="login-body">
      <h1 className="login-title">Student Login</h1>

      <div className="login-form">
        <input
          type="text"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-options">
          <Link to="/new_student" className="link">New Student?</Link>
          <Link to="/forgot_student" className="link">Forgot Password?</Link>
        </div>

        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Student_login;