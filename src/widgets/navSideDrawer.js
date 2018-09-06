import React from "react";
import { Link } from "react-router-dom";

const navSideDrawer = props => {
  let show = "";
  if (props.visible === true) {
    show = "showDrawer";
  }
  return (
    <div className={"nav__sidedrawer " + show}>
      <ul>
        <li>
          <Link to="/#" onClick={props.sideDrawerClickHandler}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/news" onClick={props.sideDrawerClickHandler}>
            News
          </Link>
        </li>
        <li>
          <Link to="/Profile" onClick={props.sideDrawerClickHandler}>
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default navSideDrawer;
