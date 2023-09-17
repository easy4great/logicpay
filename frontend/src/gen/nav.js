import React, { useState } from "react";
import {Outlet, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'

const Nav = () => {
      const [showNavbar, setShowNavbar] = useState(false);
    const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  //const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);
    // if the user is not logged in, redirect to the login page
 
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
              <NavLink to="/" onClick={handleShowNavbar}>login</NavLink>
            </li>
            <li>
              <NavLink to="/register" onClick={handleShowNavbar}>Register</NavLink>
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