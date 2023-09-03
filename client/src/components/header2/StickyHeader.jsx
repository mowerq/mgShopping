import React, { useEffect, useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const StickyHeader = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollTop > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`sticky-header ${isSticky ? "sticky" : ""}`}>
      <div className="header-main">
        <button className="header-logo-button">
          <img
            className="header-horizontal-logo"
            src="../img/logo_5_horizontal.png"
            alt="logo"
          />
        </button>

        <div className="search-bar">
          <input
            id="sticky-header-search-text-input"
            className="search-text-input"
            type="text"
            placeholder="Search a product"
            maxLength={50}
          />
          <button className="search-button">
            <FontAwesomeIcon color="white" icon={faSearch} />
          </button>
        </div>
        <div className="header-user-buttons">
          <button className="header-login">
            <FontAwesomeIcon className="header-user-buttons" icon={faUser} />
            <span className="header-button-text">Sign In</span>
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
    </header>
  );
};

export default StickyHeader;
