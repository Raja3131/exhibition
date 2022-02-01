import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import exhibition from "../../assets/images/Exhibition.png";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <img src={exhibition} alt="logo" />
         
        </div>
      </div>
    </>
  );
};

export default Navbar;
