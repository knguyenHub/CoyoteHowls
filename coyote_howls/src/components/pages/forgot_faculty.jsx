import React from "react";
import "./new_account.css";
import { Link } from "react-router-dom";

const Forgot_faculty = () => {
  return (
    <div className="back">
      <div className="left-half"></div>
      <div className="right-half">
        <div className="login-body">
          <h1 className="login-titleRecover">Recover Password</h1>

          <div className="login-form">
            <input type="text" placeholder="Email" className="input-field" />

            <button className="login-button">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot_faculty;
