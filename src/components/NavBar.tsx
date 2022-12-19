import React from "react";
import mdg_logo from "../assets/images/mdg_logo.svg";

const Navbar = () => {
  return (
    <div className="navbar-cont">
      <img src={mdg_logo} alt="mdg-logo" />
    </div>
  );
};

export default Navbar;
