import React, { useEffect, useState } from "react";
import "./ProductSearch.css";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Header from "../components/header/Header";
import SidebarMenu from "../components/sidebar-menu/SidebarMenu";
import Footer from "../components/footer/Footer";

function ProductSearch() {
  const { word } = useParams();
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const takeStarFilter = (starData) => {
    setStarFilter(starData);
    console.log(starFilter);
  };
  const takePriceFilter = (priceData) => {
    setPriceFilter(priceData);
    console.log(priceFilter);
  };
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/products/search/${word}`
        );
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const showAvgStars = (avgStars, numReviews) => {
    if (avgStars > 0) {
      const solidAvgStars = Math.round(avgStars);
      const stars = [];
      stars.push(
        <span className="category-page-avg-stars">{`${avgStars.toFixed(
          1
        )}`}</span>
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
      <Header />
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

export default ProductSearch;
