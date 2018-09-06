import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navToggleButton = props => {
  return (
    <div onClick={props.click}>
      <FontAwesomeIcon icon="bars" className="nav__burger" />
    </div>
  );
};

export default navToggleButton;
