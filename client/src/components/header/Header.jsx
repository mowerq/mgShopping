import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div id="header">
      <div id="header-main">
        <button id="header-logo-button">
          <img
            id="header-horizontal-logo"
            src="../img/logo_5_horizontal.png"
            alt="logo"
          />
        </button>

        <div id="search-bar">
          <input
            id="search-text-input"
            type="text"
            placeholder="Search a product"
            maxLength={50}
          />
          <button id="search-button">
            <FontAwesomeIcon color="white" icon={faSearch} />
          </button>
        </div>
        <div id="header-user-buttons">
          <button id="header-login">
            <FontAwesomeIcon className="header-user-buttons" icon={faUser} />
            <span className="header-button-text">Sign In</span>
          </button>
          <button id="header-favorites">
            <FontAwesomeIcon className="header-user-buttons" icon={faHeart} />
            <span className="header-button-text">Favorites</span>
          </button>
          <button id="header-cart">
            <FontAwesomeIcon
              className="header-user-buttons"
              icon={faShoppingCart}
            />
            <span className="header-button-text">Cart</span>
          </button>
        </div>
      </div>
      <div id="header-nav">
        <button className="category-nav">Women</button>
        <button className="category-nav">Men</button>
        <button className="category-nav">Children</button>
        <button className="category-nav">Home&Furniture</button>
        <button className="category-nav">Cosmetics</button>
        <button className="category-nav">Shoes</button>
        <button className="category-nav">Electronic</button>
        <button className="category-nav">Spor&Outdoor</button>
        <button className="category-nav">Supermarket</button>
      </div>
    </div>
  );
}

export default Header;
