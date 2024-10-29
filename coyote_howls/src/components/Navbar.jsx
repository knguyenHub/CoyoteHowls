import React, {useState} from 'react';

import {Link, NavLink} from "react-router-dom"    /* special component from the react router library to change the url when you click the buttons in nav */
import "./Navbar.css"  /* importing the Navbar.css file so its viewable on the live website */
import homeImage from "/src/assets/logo-final-draft.png";
export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)       /* useState to determine if the menu pull down should be opened or closed */

/* an unordered list for the nav bar and each link is a list item using NavLink, that's why 'Home' isn't part of the list since it's in the opposite corner*/
/* Navlink highlights and Link doesn't that's why the Homepage has Link instead of Navlink */
/* the span is used to make the 3 lines for the pull down menu */
  return (
    <nav>
      <Link to="/CoyoteHowls/" className = "title"><img src={homeImage} alt="Home" style={{ width: '70px', height: '70px', marginLeft: '5px', borderRadius: '3px'}}/></Link>
      <div className="menu" onClick ={() => {           /* adds the pull down menu when screen is small on top right and the action click for */
        setMenuOpen(!menuOpen);
      }}>
        <span></span>                                   
        <span></span>
        <span></span>
      </div>
      <ul className = {menuOpen ? "open" : ""}>             
       {/* <li>                                                        
          <NavLink to="/message">Message</NavLink>   //commmented out message button
        </li>  */}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/Log_in">Log in</NavLink>
        </li> 
        <li hidden>
          <NavLink to="/StudentDashboard">Dashboard</NavLink>
          </li>
          <li hidden>
          <NavLink to="/FalcultyDashboard">Dashboard</NavLink>
          </li>
      </ul>
    </nav>
  );
};
