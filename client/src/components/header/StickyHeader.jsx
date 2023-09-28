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
  faBagShopping,
  faComments,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const StickyHeader = ({ isUser, userData }) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleLogOut = () => {
    localStorage.setItem("accessToken", "");
    window.location.reload();
  };
  const searchProduct = async () => {
    navigate(`/search/${document.getElementById("search-text-input").value}`);
  };
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
  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate("/login", { state: { isSignIn: true } });
  };
  const goSignupPage = () => {
    navigate("/login", { state: { isSignIn: false } });
  };
  const goHomepage = () => {
    navigate("/");
  };
  const goCartPage = () => {
    navigate("/cart");
  };
  const goFavorites = () => {
    navigate("/categories/favorites");
  };

  return (
    <header className={`sticky-header ${isSticky ? "sticky" : ""}`}>
      <div className="header-main">
        <button className="header-logo-button">
          <img
            onClick={goHomepage}
            className="header-horizontal-logo"
            src="../img/logo_17_horizontal.png"
            alt="logo"
          />
        </button>

        <div className="search-bar">
          <input
            className="search-text-input"
            id="search-text-input"
            type="text"
            placeholder="Search a product"
            maxLength={50}
          />
          <button onClick={searchProduct} className="search-button">
            <FontAwesomeIcon color="white" icon={faSearch} />
          </button>
        </div>
        <div className="header-user-buttons">
          <SearchButton />
          <div className="header-login header-user-button">
            <FontAwesomeIcon icon={faUser} title="Login" />
            <span className="header-button-text">
              {isUser ? "Profile" : "Sign in"}
              <div className="speech-bubble-wrapper">
                {isUser ? (
                  <div className="speech-bubble top header-profile">
                    <span className="header-profile-name">{`${userData.name}`}</span>
                    <div className="header-profile-buttons">
                      <div className="header-profile-button">
                        <FontAwesomeIcon
                          className="header-profile-button-icon"
                          icon={faBagShopping}
                        />
                        <span className="header-profile-button-content">
                          My Orders
                        </span>
                      </div>
                      <div className="header-profile-button">
                        <FontAwesomeIcon
                          className="header-profile-button-icon"
                          icon={faComments}
                        />
                        <span className="header-profile-button-content">
                          My Reviews
                        </span>
                      </div>
                      <div className="header-profile-button">
                        <FontAwesomeIcon
                          className="header-profile-button-icon"
                          icon={faUser}
                        />
                        <span className="header-profile-button-content">
                          My Information
                        </span>
                      </div>
                      <div
                        onClick={handleLogOut}
                        className="header-profile-button"
                      >
                        <FontAwesomeIcon
                          className="header-profile-button-icon"
                          icon={faArrowRightFromBracket}
                        />
                        <span className="header-profile-button-content">
                          Log out
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="speech-bubble top">
                    <button
                      onClick={goLoginPage}
                      className="sign-in-button sign-buttons"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={goSignupPage}
                      className="sign-up-button sign-buttons"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </span>
          </div>
          <div className="header-cart-div">
            {isUser ? (
              <span id="num-products-in-favorites">{`${userData.favorites.length}`}</span>
            ) : null}

            <button
              onClick={isUser ? goFavorites : goLoginPage}
              className="header-cart header-user-button"
            >
              <FontAwesomeIcon
                className="header-button-icon"
                icon={faHeart}
                title="Favorites"
              />
              <span className="header-button-text">Favorites</span>
            </button>
          </div>
          <div className="header-cart-div">
            {isUser ? (
              <span id="num-products-in-cart">{`${userData.cart.products.length}`}</span>
            ) : null}
            <button
              onClick={isUser ? goCartPage : goLoginPage}
              className="header-cart header-user-button"
            >
              <FontAwesomeIcon
                className="header-button-icon"
                icon={faShoppingCart}
                title="Cart"
              />
              <span className="header-button-text">Cart</span>
            </button>
          </div>

          <button className="sidebar-menu header-user-button">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
