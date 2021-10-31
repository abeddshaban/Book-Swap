import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
// import MessageIcon from "@material-ui/icons/Chat";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import "../stylings/NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <ul>
        {/* Search Icon */}
        <li>
          <Link to="/search">
            <button id="nav__btn">
              <SearchIcon className="navbar__icon" />
              <h4> search </h4>
            </button>
          </Link>
        </li>
        {/* Home Icon */}
        <li>
          <Link to="/">
            <button id="nav__btn">
              <HomeIcon className="navbar__icon" />
              <h4 className="text"> Home </h4>
            </button>
          </Link>
        </li>
        {/* Upload Icon */}
        <li>
          <Link to="/upload">
            <button id="nav__btn">
              <AddIcon className="navbar__icon" />
              <h4> upload </h4>
            </button>
          </Link>
        </li>
        {/* Message Icon */}
        {/* <li>
          <Link to="/message">
            <button id="nav__btn">
              <MessageIcon className="navbar__icon" />
              <h4> message </h4>
            </button>
          </Link>
        </li> */}
        {/* Profile Icon */}
        <li>
          <Link to="/profile">
            <button id="nav__btn">
              <ProfileIcon id="icon" className="navbar__icon" />
              <h4 id="text"> profile </h4>
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
