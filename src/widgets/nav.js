import React from "react";
import { Link } from "react-router-dom";

import NavToggleButton from "./navToggleButton";
import { SITE_NAME } from "../config";

const nav = props => {
  return (
    <header className="nav__container">
      <nav className="nav">
        <NavToggleButton click={props.sideDrawerClickHandler} />
        <div className="nav__logo">
          <Link to="/">{SITE_NAME}</Link>
        </div>
        <div className="spacer" />
        <div className="navitems__desktop">
          <ul>
            <li>
              <Link to="/#">HOME</Link>
            </li>
            <li>
              <Link to="/news">NEWS</Link>
            </li>
            <li>
              <Link to="/profile">PROFILE</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div />
    </header>
  );

  // return <header className="header">{bars()}</header>;
};

export default nav;
