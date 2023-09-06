import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faYoutube,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer-section">
        <h1 className="footer-header">MG Shopping</h1>
        <ol>
          <li className="footer-li">Who Are We?</li>
          <li className="footer-li">Career</li>
          <li className="footer-li">Contact</li>
          <li className="footer-li">Sell on MG Shopping</li>
        </ol>
      </div>
      <div className="footer-section">
        <h1 className="footer-header">Help</h1>
        <ol>
          <li className="footer-li">Frequently Asked Questions</li>
          <li className="footer-li">Online Help</li>
          <li className="footer-li">How Can I Return?</li>
          <li className="footer-li">Process Manual</li>
        </ol>
      </div>
      <div className="footer-section">
        <h1 className="footer-header">Campaigns</h1>
        <ol>
          <li className="footer-li">Active Campaigns</li>
          <li className="footer-li">Elite Membership</li>
          <li className="footer-li">Present Ideas</li>
          <li className="footer-li">MG Shopping Opportunities</li>
        </ol>
      </div>
      <div className="footer-section">
        <h1 className="footer-header">Social Media</h1>
        <ol>
          <li className="footer-icon">
            <FontAwesomeIcon icon={faXTwitter} />
          </li>
          <li className="footer-icon">
            <FontAwesomeIcon icon={faFacebookF} />
          </li>
          <li className="footer-icon">
            <FontAwesomeIcon icon={faInstagram} />
          </li>
          <li className="footer-icon">
            <FontAwesomeIcon icon={faYoutube} />
          </li>
        </ol>
      </div>
    </footer>
  );
}

export default Footer;
