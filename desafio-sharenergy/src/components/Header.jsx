import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { IconContext } from "react-icons";
import { FaMoneyCheckAlt, FaUserAlt, FaHome } from 'react-icons/fa';
import '../css/header.css'

export default function Header() {
  return (
    <nav className="d-flex justify-content-between">
      <img src={ logo } alt="logo" className="logo"/>
      <IconContext.Provider value={
        { color: "#565656",
          className: "react-icons",
          size: "2em",
          style: { verticalAlign: "middle" }
        }
      }>
        <div className="icons">
          <Link to="/"><FaHome /></Link>
          <Link to="/clients"><FaUserAlt /></Link>
          <Link to="/finance"><FaMoneyCheckAlt /></Link>
        </div>
      </IconContext.Provider>
    </nav>
  )
}
