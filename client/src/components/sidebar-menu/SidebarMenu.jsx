import React from "react";
import "./SidebarMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SidebarMenu({ starData, priceData }) {
  const navigate = useNavigate();

  return (
    <div id="category-and-filter-menu">
      <h5 id="sidebar-menu-categories-title">Categories</h5>
      <div id="sidebar-menu-categories">
        <button
          onClick={() => navigate("/categories/allproducts")}
          className="price-filter-button"
        >
          All Products
        </button>
        <button
          onClick={() => navigate("/categories/women")}
          className="price-filter-button"
        >
          Women
        </button>
        <button
          onClick={() => navigate("/categories/men")}
          className="price-filter-button"
        >
          Men
        </button>
        <button
          onClick={() => navigate("/categories/homeandfurniture")}
          className="price-filter-button"
        >
          Home & Furniture
        </button>
        <button
          onClick={() => navigate("/categories/cosmetics")}
          className="price-filter-button"
        >
          Cosmetics
        </button>
        <button
          onClick={() => navigate("/categories/shoes")}
          className="price-filter-button"
        >
          Shoes
        </button>
        <button
          onClick={() => navigate("/categories/electronics")}
          className="price-filter-button"
        >
          Electronics
        </button>
        <button
          onClick={() => navigate("/categories/sporandoutdoor")}
          className="price-filter-button"
        >
          Spor & Outdoor
        </button>
      </div>
      <ul id="sidebar-menu-filters">
        <h4 id="sidebar-manu-filter-header">Filter</h4>
        <h5 className="sidebar-menu-filter-title">By reviews</h5>
        <div id="review-filter">
          <div onClick={() => starData(4)} className="review-stars">
            <FontAwesomeIcon className="faStar" icon={fasStar} />
            <FontAwesomeIcon className="faStar" icon={fasStar} />
            <FontAwesomeIcon className="faStar" icon={fasStar} />
            <FontAwesomeIcon className="faStar" icon={fasStar} />
            <FontAwesomeIcon className="faStar" icon={farStar} />
            <span className="and-up"> & Up</span>
          </div>
          <div onClick={() => starData(3)} className="review-stars">
            <FontAwesomeIcon className="faStar" icon={fasStar} />
            <FontAwesomeIcon className="faStar" icon={fasStar} />
            <FontAwesomeIcon className="faStar" icon={fasStar} />
            <FontAwesomeIcon className="faStar" icon={farStar} />
            <FontAwesomeIcon className="faStar" icon={farStar} />
            <span className="and-up"> & Up</span>
          </div>
          <div onClick={() => starData(2)} className="review-stars">
            <FontAwesomeIcon className="faStar" icon={fasStar} />
            <FontAwesomeIcon className="faStar" icon={fasStar} />
            <FontAwesomeIcon className="faStar" icon={farStar} />
            <FontAwesomeIcon className="faStar" icon={farStar} />
            <FontAwesomeIcon className="faStar" icon={farStar} />
            <span className="and-up"> & Up</span>
          </div>
          <div onClick={() => starData(0)} className="review-stars">
            <FontAwesomeIcon className="faStar" icon={fasStar} />
            <FontAwesomeIcon className="faStar" icon={farStar} />
            <FontAwesomeIcon className="faStar" icon={farStar} />
            <FontAwesomeIcon className="faStar" icon={farStar} />
            <FontAwesomeIcon className="faStar" icon={farStar} />
            <span className="and-up"> & Up</span>
          </div>
        </div>
        <h5 className="sidebar-menu-filter-title">By price</h5>
        <div id="price-filter">
          <button
            onClick={() => priceData([0, 100])}
            className="price-filter-button"
          >
            Under ₺100
          </button>
          <button
            onClick={() => priceData([100, 250])}
            className="price-filter-button"
          >
            ₺100 to ₺250
          </button>
          <button
            onClick={() => priceData([250, 500])}
            className="price-filter-button"
          >
            ₺250 to ₺500
          </button>
          <button
            onClick={() => priceData([500, 1000])}
            className="price-filter-button"
          >
            ₺500 to ₺1000
          </button>
          <button
            onClick={() => priceData([1000, Number.MAX_VALUE])}
            className="price-filter-button"
          >
            ₺1000 & above
          </button>
          <div className="min-max-price-div">
            <input type="text" placeholder="Min" id="min-price-filter-input" />
            <input type="text" placeholder="Max" id="max-price-filter-input" />
            <span className="tl-symbol-min">₺</span>
            <span className="tl-symbol-max">₺</span>
            <button
              onClick={() => {
                const minPrice = Number(
                  document.getElementById("min-price-filter-input").value
                );
                const maxPrice = Number(
                  document.getElementById("max-price-filter-input").value
                );
                if ((minPrice == 0) & (maxPrice == 0)) {
                  priceData([0, Number.MAX_VALUE]);
                  return;
                }
                if (minPrice > maxPrice) {
                  Swal.fire(
                    "Sorry!",
                    "Minimum cannot be higher than maximum!",
                    "error"
                  );
                } else {
                  priceData([minPrice, maxPrice]);
                }
              }}
              className="apply-filter-button"
            >
              Apply
            </button>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default SidebarMenu;
