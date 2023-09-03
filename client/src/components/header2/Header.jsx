import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import StickyHeader from "./StickyHeader";

function Header() {
  const navigate = useNavigate();
  const goLoginPage = () => navigate("/login");
  return (
    <header>
      <img
        className="header-image"
        src="../../../svg/header.svg"
        alt="Header"
      />
      <StickyHeader />
      <div className="header-main">
        <button className="header-logo-button">
          <img
            className="header-horizontal-logo"
            src="../img/logo_7_horizontal.png"
            alt="logo"
          />
        </button>

        <div className="search-bar">
          <input
            id="header-search-text-input"
            className="search-text-input"
            type="text"
            placeholder="Search a product"
            maxLength={50}
          />
          <button className="search-button">
            <FontAwesomeIcon color="black" icon={faSearch} />
          </button>
        </div>
        <div className="header-user-buttons">
          <button className="header-login">
            <FontAwesomeIcon className="header-user-buttons" icon={faUser} />
            <span onClick={goLoginPage} className="header-button-text">
              Sign In
            </span>
          </button>
          <button className="header-favorites">
            <FontAwesomeIcon className="header-user-buttons" icon={faHeart} />
            <span className="header-button-text">Favorites</span>
          </button>
          <button className="header-cart">
            <FontAwesomeIcon
              className="header-user-buttons"
              icon={faShoppingCart}
            />
            <span className="header-button-text">Cart</span>
          </button>
        </div>
      </div>
      <div className="header-nav">
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
    </header>
  );
}

export default Header;
