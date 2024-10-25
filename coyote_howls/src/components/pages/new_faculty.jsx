import React, { useState } from 'react';
import './new_account.css';
import { Link, useNavigate } from 'react-router-dom';
import { register, login } from '../../auth';

const New_faculty = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const user = await register(email, password);
      console.log('User registered:', user);
      // Optionally, you can log in the user immediately after registration
      const loggedInUser = await login(email, password);
      console.log('User logged in:', loggedInUser);
      navigate('/FacultyDashboard');
    } catch (error) {
      console.error('Error registering or logging in user:', error);
      alert(`Failed to register or log in user: ${error.message}`);
    }
  };

  return (
    <div className="login-body">
      <h1 className="login-title">Create Faculty Account</h1>

      <div className="login-form">
        <input
          type="text"
          placeholder="Name"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleRegister}>Create</button>
      </div>
    </div>
  );
};

export default New_faculty;