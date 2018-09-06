import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const button = props => {
  let template = null;

  switch (props.type) {
    case "loadmorebutton":
      template = (
        <div className="red_button" onClick={props.loadmore}>
          {props.text}
        </div>
      );
      break;
    case "backbutton":
      template = (
        <Link to="/#">
          <div className="button__back">
            <FontAwesomeIcon icon="caret-left" className="nav__caretleft" />{" "}
            <div className="button__back__text">{props.text}</div>
          </div>
        </Link>
      );
      break;
    default:
      template = null;
  }
  return template;
};

export default button;
