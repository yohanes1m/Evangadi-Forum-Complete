import React from "react";
import classes from "./Footer.module.css";
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className={classes.outer_container}>
      <div className={classes.container}>
        <div>
          <div>
            <Link to="/home">
              <img
                src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-footer.png"
                alt="evangadi logo"
              />
            </Link>
          </div>
          <div className={classes.icons}>
            <Link to="#">
              <SlSocialFacebook color="white" size={38} />
            </Link>
            <Link to="#">
              <FaInstagram color="white" size={38} />
            </Link>
            <Link to="#">
              <FiYoutube color="white" size={38} />
            </Link>
          </div>
        </div>
        <div>
          <h2>Usefull Links</h2>
          <Link to="#">
            <p>How it works</p>
          </Link>
          <Link to="#">
            <p>Terms of service</p>
          </Link>
          <Link to="#">
            <p>Privacy policy</p>
          </Link>
        </div>
        <div>
          <h2>Contact Info</h2>
          <p>Evangadi Networks</p>
          <p>support@evangadi.com</p>
          <p>+202-111-111-1111</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
