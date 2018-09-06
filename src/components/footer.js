import React from "react";
import { SITE_NAME } from "../config";

const Footer = () => {
  let date = new Date();
  let Year = date.getFullYear();
  return (
    <div className="footer">
      <div className="footer__text">
        {Year} &copy; by {SITE_NAME}
      </div>
    </div>
  );
};

export default Footer;
