import React, { useEffect, useState } from "react";
import "./Header.css";
import SearchButton from "./search-button/SearchButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
  faHeart,
  faBars,
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
            src="../img/logo_17_horizontal.png"
            alt="logo"
          />
        </button>

        <div className="search-bar">
          <input
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
          <SearchButton />
          <button className="header-login header-user-button">
            <FontAwesomeIcon icon={faUser} title="Login" />
            <span className="header-button-text">
              Sign In{" "}
              <div className="speech-bubble-wrapper">
                <div className="speech-bubble top">
                  <button
                    onClick={() => alert("Sign in")}
                    className="sign-in-button sign-buttons"
                  >
                    {" "}
                    Sign In
                  </button>
                  <button
                    onClick={() => alert("Sign Up")}
                    className="sign-up-button sign-buttons"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </span>
          </button>
          <button className="header-favorites header-user-button">
            <FontAwesomeIcon icon={faHeart} title="Favorites" />
            <span className="header-button-text">Favorites</span>
          </button>
          <button className="header-cart header-user-button">
            <FontAwesomeIcon icon={faShoppingCart} title="Cart" />
            <span className="header-button-text">Cart</span>
          </button>
          <button className="sidebar-menu header-user-button">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
