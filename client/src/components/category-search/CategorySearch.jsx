import React, { useState } from "react";
import "./CategorySearch.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import axios from "axios";
import { useEffect } from "react";
import SidebarMenu from "../sidebar-menu/SidebarMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { TailSpin } from "react-loader-spinner";

function CategorySearch() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [starFilter, setStarFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState([0, Number.MAX_VALUE]);
  const [loading, setLoading] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState({});

  const retrieveUser = (loggedInUser) => {
    setUser(loggedInUser);
    setUserLoaded(true);
  };
  const takeStarFilter = (starData) => {
    setStarFilter(starData);
    console.log(starFilter);
  };
  const takePriceFilter = (priceData) => {
    setPriceFilter(priceData);
    console.log(priceFilter);
  };
  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        let response;
        console.log(category);
        if (category === "allproducts") {
          response = await axios.get(`http://localhost:5001/api/products/`);
        } else if (category === "favorites") {
          if (userLoaded) {
            const productsArray = [];
            for (let i = 0; i < user.favorites.length; i++) {
              response = await axios.get(
                `http://localhost:5001/api/products/${user.favorites[i]}`
              );
              productsArray.push(response.data);
            }
            const filtered = productsArray.filter(
              (p) =>
                p.avgStars >= starFilter &&
                p.price >= priceFilter[0] &&
                p.price <= priceFilter[1]
            );
            setProducts(filtered);
            setLoading(false);
            return;
          } else {
            return;
          }
        } else {
          response = await axios.get(
            `http://localhost:5001/api/products/categories/${category}`
          );
        }

        const filtered = response.data.filter(
          (p) =>
            p.avgStars >= starFilter &&
            p.price >= priceFilter[0] &&
            p.price <= priceFilter[1]
        );
        setProducts(filtered);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getProductsByCategory();
  }, [category, starFilter, priceFilter, user]);

  const showAvgStars = (avgStars, numReviews) => {
    if (avgStars > 0) {
      const solidAvgStars = Math.round(avgStars);
      const stars = [];
      stars.push(
        <span className="category-page-avg-stars">{`${avgStars}`}</span>
      );
      for (let i = 0; i < solidAvgStars; i++) {
        stars.push(<FontAwesomeIcon className="faStar" icon={fasStar} />);
      }
      for (let i = 0; i < 5 - solidAvgStars; i++) {
        stars.push(<FontAwesomeIcon className="faStar" icon={farStar} />);
      }
      stars.push(<span className="num-reviews">{`(${numReviews})`}</span>);
      return stars;
    }
  };

  return (
    <div className="category-search-container">
      <Header userRetriever={retrieveUser} />
      <div id="category-search-page-content">
        <SidebarMenu starData={takeStarFilter} priceData={takePriceFilter} />
        {loading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TailSpin
              height="80"
              width="80"
              color="#542811"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div id="category-page-cards-container">
            {products.map((e, i) => (
              <div
                onClick={() => navigate(`/product/${e._id}`)}
                className="category-page-product-card"
              >
                <img
                  src={`${e["imgUrl"]}`}
                  alt="Product Image"
                  className="category-search-product-image"
                />
                <div className="category-page-product-details">
                  <div
                    key={`product-stars-${i}`}
                    className="categoy-page-product-stars"
                  >
                    {showAvgStars(e.avgStars, e.reviews.length)}
                  </div>
                  <h3 className="category-page-product-name">{`${e["name"]}`}</h3>
                  <span className="category-page-product-price">{`₺ ${e[
                    "price"
                  ].toLocaleString()}`}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CategorySearch;
