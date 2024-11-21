import React, { useState } from 'react';
import './new_account.css';
import { sendPasswordResetEmail } from 'firebase/auth'; // Use sendPasswordResetEmail directly
import { auth } from '../../auth'; // Ensure auth is imported correctly from your Firebase config

const ForgotFaculty = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handlePasswordReset = async () => {
    if (!email) {
      setMessage("Please enter an email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(`Password reset email sent to ${email}`);
    } catch (error) {
      setMessage(`Error resetting password: ${error.message}`);
    }
  };

  return (
    <div className="login-body">
      <h1 className="login-title">Recover Password</h1>

      <div className="login-form">
        <input
          type="text"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="login-button" onClick={handlePasswordReset}>
          Confirm
        </button>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotFaculty;