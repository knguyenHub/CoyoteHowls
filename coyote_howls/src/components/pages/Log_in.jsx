import React from "react"; // Assuming Navbar is in the same directory
import login from "../../assets/logIn.png";
import "./Log_in.css"; // Assuming you have a CSS file for styles
import { Link } from "react-router-dom";

const Log_in = () => {
  return (
    <div className="back">
      <div className="left-half"></div>
      <div className="right-half">
        <div className="right-background">
          {/* Login Header */}
          <div className="login-header">
            <h1>Login</h1>
          </div>
          {/* Main Content */}
          <div className="login-content">
            <h2>Who are you ?</h2>
            <div className="button-container">
              <Link to="/faculty">
                <button className="role-button">Faculty</button>
              </Link>
              <Link to="/student">
                <button className="role-button">Student</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log_in;
