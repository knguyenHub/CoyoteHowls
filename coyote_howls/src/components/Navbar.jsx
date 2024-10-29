import React, {useState} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";   /* special component from the react router library to change the url when you click the buttons in nav */
import "./Navbar.css"  /* importing the Navbar.css file so its viewable on the live website */
import homeImage from "/src/assets/logo-final-draft.png";
import { useUser } from './pages/UserContext';
import { logout } from '../auth';

export const Navbar = () => {
    const { user, setUser } = useUser();
    const [menuOpen, setMenuOpen] = useState(false)       /* useState to determine if the menu pull down should be opened or closed */
    const navigate = useNavigate(); // use useNavigate hook 
    
    const handleLogout = async () => {
      await logout();
      setUser({ isLoggedIn: false, role: null});
      navigate("/CoyoteHowls/");
    };

  
/* an unordered list for the nav bar and each link is a list item using NavLink, that's why 'Home' isn't part of the list since it's in the opposite corner*/
/* Navlink highlights and Link doesn't that's why the Homepage has Link instead of Navlink */
/* the span is used to make the 3 lines for the pull down menu */
  return (
    <nav>
      <Link to="/CoyoteHowls/" className = "title">
        <img src={homeImage} alt="Home" style={{ width: '70px', height: '70px', marginLeft: '5px', borderRadius: '3px'}}/>
      </Link>
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

        {user.isLoggedIn ? (
          <>
          <li>
            <button className="logOut_btn" onClick={handleLogout}>Log Out</button>
          </li>
          {user.role === 'student' ? (
            <li>
              <NavLink to="/StudentDashboard">Dashboard</NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/FacultyDashboard">Dashboard</NavLink>
            </li>
          )}
        </>
      ) : (
        <li>
          <NavLink to="/Log_in">Log in</NavLink>
        </li>
     


        )}
      
      </ul>
    </nav>
  );
};

