import React, {useState} from 'react';

import {Link, NavLink} from "react-router-dom"

import "./Navbar.css";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)


  return (
    <nav>
      <Link to="/" className = "title">Home</Link>
      <div className="menu" onClick ={() => {
        setMenuOpen(!menuOpen);
      }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className = {menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/message">Message</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/Log in">Log in</NavLink>
        </li> 
      </ul>
    </nav>
  );
};

