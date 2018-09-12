import React from "react";
import { Link } from "react-router-dom";
import { firebase } from "../firebase";

const navSideDrawer = props => {
  let show = "";

  if (props.visible === true) {
    show = "showDrawer";
  }

  let navItems = [
    {
      text: "News",
      link: "/"
    },
    {
      text: "Profile",
      link: "/profile",
      login: true
    },
    {
      text: "Dashboard",
      link: "/dashboard",
      login: true
    },
    {
      text: "Sign In",
      link: "/signin",
      login: false
    },
    {
      text: "Sign Out",
      link: "/signout",
      login: true
    }
  ];

  const renderItems = (navItem, key) => (
    <Link key={key} to={navItem.link} onClick={props.sideDrawerClickHandler}>
      {navItem.text}
    </Link>
  );

  const checkItems = navItems => {
    return navItems.map((item, key) => {
      if (item.login == null) {
        return renderItems(item, key);
      }
      if (item.login === false && !props.user) {
        return renderItems(item, key);
      }
      if (item.login === true && props.user) {
        if (item.link === "/signout") {
          return (
            <Link
              to="/"
              key={key}
              onClick={() => {
                firebase.auth().signOut();
                props.sideDrawerClickHandler();
              }}
            >
              {item.text}
            </Link>
          );
        }
        return renderItems(item, key);
      }
      return;
    });
  };

  return (
    <div className={"nav__sidedrawer " + show}>
      <ul>{checkItems(navItems)}</ul>
    </div>
  );
};
export default navSideDrawer;
