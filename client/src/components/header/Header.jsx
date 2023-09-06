import React, { useEffect, useState } from "react";
import "./Header.css";
import SearchButton from "./search-button/SearchButton";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBagShopping,
  faShoppingCart,
  faComments,
  faUser,
  faHeart,
  faBars,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import StickyHeader from "./StickyHeader";
import { useNavigate } from "react-router-dom";

function Header({ userRetriever }) {
  const [isUser, setIsUser] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const handleLogOut = () => {
    localStorage.setItem("accessToken", "");
    window.location.reload();
  };
  const getCurrentUser = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken !== "") {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/users/current",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setIsUser(true);
        setUserData(response.data);
        userRetriever(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCurrentUser();
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
  const goFavorites = () => {
    navigate("/categories/favorites");
  };
  const goCartPage = () => {
    if (isUser) {
      navigate("/cart");
    } else {
      navigate("/login", { state: { isSignIn: true } });
    }
  };
  return isLoading ? (
    <div>The page is loading..</div>
  ) : (
    <header>
      <StickyHeader isUser={isUser} userData={userData} />
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
      <div className="header-nav">
        <button
          onClick={() => navigate("/categories/women")}
          className="category-nav"
        >
          Women
        </button>
        <button
          onClick={() => navigate("/categories/men")}
          className="category-nav"
        >
          Men
        </button>
        <button
          onClick={() => navigate("/categories/homeandfurniture")}
          className="category-nav"
        >
          Home&Furniture
        </button>
        <button
          onClick={() => navigate("/categories/cosmetics")}
          className="category-nav"
        >
          Cosmetics
        </button>
        <button
          onClick={() => navigate("/categories/shoes")}
          className="category-nav"
        >
          Shoes
        </button>
        <button
          onClick={() => navigate("/categories/electronics")}
          className="category-nav"
        >
          Electronics
        </button>
        <button
          onClick={() => navigate("/categories/sporandoutdoor")}
          className="category-nav"
        >
          Spor&Outdoor
        </button>
        <button
          onClick={() => navigate("/categories/allproducts")}
          className="category-nav"
        >
          All Products
        </button>
      </div>
    </header>
  );
}

Header.defaultProps = {
  userRetriever: () => {},
};

export default Header;
