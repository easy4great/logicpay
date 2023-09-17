import React, { useState } from "react";
import {Outlet, NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../gen/Navbar.css';

const Nav = () => {
      const [showNavbar, setShowNavbar] = useState(false);
    const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);
    // if the user is not logged in, redirect to the login page
    //const navigate = useNavigate();
    const handleLogout = () => {
      // clear the token from local storage and set the user as logged out
      localStorage.removeItem('token');
      setLoggedIn(false);
     // navigate('/');
      window.location.replace("https://dev.logicmind.com:3006/");
    }
  return (
      <>
          <div>
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h> Welcome</h>
        </div>
                <div className="menu-icon" onClick={handleShowNavbar}>
          <h> Menu</h>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
          <li>
              <NavLink to="/user" onClick={handleShowNavbar}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/user/paystack" onClick={handleShowNavbar}>Add Money</NavLink>
            </li>
            <li>
              <NavLink to="/user/transfer" onClick={handleShowNavbar}>Transfer</NavLink>
            </li>
            <li>
              <NavLink to="/user/message" onClick={handleShowNavbar}>Message(s)</NavLink>
            </li>
            <li>
                  <button loggedIn={!loggedIn} onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Outlet />
                </div>
        </>
  )
}

export default Nav