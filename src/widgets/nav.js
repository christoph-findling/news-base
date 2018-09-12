import React from "react";
import { Link } from "react-router-dom";
import { firebase } from "../firebase";

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
              <Link to="/news">NEWS</Link>
            </li>
            {props.user != null ? (
              <li>
                <Link to="/dashboard">DASHBOARD</Link>
              </li>
            ) : (
              ""
            )}
            {props.user != null ? (
              <li>
                <Link to="/profile">PROFILE</Link>
              </li>
            ) : (
              ""
            )}
            {props.user != null ? (
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    firebase.auth().signOut();
                  }}
                >
                  SIGN OUT
                </Link>
              </li>
            ) : (
              ""
            )}
            {props.user == null ? (
              <li>
                <Link to="/signin">SIGN IN</Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </nav>

      <div />
    </header>
  );

  // return <header className="header">{bars()}</header>;
};

export default nav;
