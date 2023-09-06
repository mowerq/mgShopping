import React, { useEffect, useState } from "react";
import "./Product.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fasStar,
  faHeart as fasHeart,
  faCartShopping,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as farStar,
  faHeart as farHeart,
} from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";

function Product() {
  const { productid } = useParams();
  const [product, setProduct] = useState({});
  const [isValidId, setIsValidId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [isUser, setIsUser] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isOnCart, setIsOnCart] = useState(false);
  const [controller, setController] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const retrieveUser = (loggedInUser) => {
    setUser(loggedInUser);
    if (loggedInUser) {
      setIsUser(true);
      if (
        loggedInUser.favorites &&
        loggedInUser.favorites.some((item) => item.toString() === productid)
      ) {
        setIsFav(true);
      }
      if (
        loggedInUser.cart &&
        loggedInUser.cart.products &&
        loggedInUser.cart.products.some(
          (item) => item.productId.toString() === productid
        )
      ) {
        setIsOnCart(true);
      }
    }
  };
  useEffect(() => {
    const getProductByProductId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/products/${productid}`
        );
        setProduct(response.data);
        setIsValidId(true);
        setIsLoading(false);
        console.log(user.cart.products);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getProductByProductId();
  }, [productid, user, isFav]);

  const handleFav = async () => {
    if (accessToken !== "") {
      try {
        let favs = user.favorites;
        if (isFav) {
          favs = favs.filter((item) => item !== productid);
        } else {
          favs.push(productid);
        }
        await axios.put(
          "http://localhost:5001/api/users/current",
          { favorites: favs },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        Swal.fire({
          toast: true,
          position: "top-right",
          iconColor: "green",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          icon: "success",
          title: "Success",
        });
        setIsFav(!isFav);
        user.favorites = favs;
      } catch (error) {}
    } else {
      /*if (!localStorage.getItem("isShowed")) {
        Swal.fire(
          "Warning",
          "Without an account, favorites get deleted in 7 days",
          "warning"
        );
        localStorage.setItem("isShowed", "showed");
        localStorage.setItem("favorites", { ids: [productid] });
      } else {
        console.log(localStorage.getItem("favorites"));
        const favs = localStorage.getItem("favorites").ids;
        favs.push(productid);
        localStorage.setItem("favorites", favs);
        
      }*/
      Swal.fire("Warning", "Please sign in!", "warning");
    }
  };

  const handleCart = async () => {
    if (accessToken !== "") {
      try {
        let cartProducts = user.cart.products;
        let found = false;
        for (let i = 0; i < cartProducts.length; i++) {
          if (cartProducts[i].productId === productid) {
            cartProducts[i].quantity++;
            found = true;
            break;
          }
        }
        if (!found) {
          cartProducts.push({
            productId: productid,
            productPrice: product.price,
            quantity: 1,
            imgUrl: product.imgUrl,
            name: product.name,
            category: product.category,
          });
        }
        console.log(cartProducts);
        const response = await axios.put(
          "http://localhost:5001/api/users/current/cart",
          { products: cartProducts },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response);
        setController(!controller);
        Swal.fire({
          toast: true,
          icon: "success",
          title: "Success!",
          text: "Your toast message here",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const showAvgStars = (avgStars, numReviews) => {
    if (avgStars > 0) {
      const solidAvgStars = Math.round(avgStars);
      const stars = [];
      stars.push(
        <span className="product-page-avg-stars">{`${avgStars.toFixed(
          1
        )}`}</span>
      );
      for (let i = 0; i < solidAvgStars; i++) {
        stars.push(
          <FontAwesomeIcon className="product-page-faStar" icon={fasStar} />
        );
      }
      for (let i = 0; i < 5 - solidAvgStars; i++) {
        stars.push(
          <FontAwesomeIcon className="product-page-faStar" icon={farStar} />
        );
      }
      stars.push(
        <span className="product-page-num-reviews">{`${numReviews} Reviews`}</span>
      );
      return stars;
    }
  };

  const showStars = (numStars) => {
    const stars = [];

    for (let i = 0; i < numStars; i++) {
      stars.push(
        <FontAwesomeIcon className="product-page-faStar" icon={fasStar} />
      );
    }
    for (let i = 0; i < 5 - numStars; i++) {
      stars.push(
        <FontAwesomeIcon className="product-page-faStar" icon={farStar} />
      );
    }
    return stars;
  };
  const writeReview = () => {
    Swal.fire({
      title: "What do think about this product?",
      currentProgressStep: 0,
      cancelButtonText: "Cancel",
      confirmButtonText: "Okay",
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,

      html: `<form class="star-rating">
      <input class="radio-input" type="radio" id="star5" name="star-input" value="5" />
      <label class="radio-label" class for="star5" title="5 stars">5 stars</label>
    
      <input class="radio-input" type="radio" id="star4" name="star-input" value="4" />
      <label class="radio-label" for="star4" title="4 stars">4 stars</label>
    
      <input class="radio-input" type="radio" id="star3" name="star-input" value="3" />
      <label class="radio-label" for="star3" title="3 stars">3 stars</label>
    
      <input class="radio-input" type="radio" id="star2" name="star-input" value="2" />
      <label class="radio-label" for="star2" title="2 stars">2 stars</label>
    
      <input class="radio-input" type="radio" id="star1" name="star-input" value="1" />
      <label class="radio-label" for="star1" title="1 star">1 star</label>
    </form>
    <textarea required name="review-input" rows="4" id="review-input" placeholder="Enter your review..."></textarea>
    `,
      // optional class to show fade-in backdrop animation which was disabled in Queue mixin
      showClass: { backdrop: "swal2-noanimation" },
      preConfirm: () => {
        return new Promise((resolve) => {
          const rating = document.querySelector(
            'input[name="star-input"]:checked'
          );
          console.log(rating);
          const reviewInput = document.getElementById("review-input");
          if (reviewInput.value.trim() === "" || !rating) {
            Swal.showValidationMessage("Please enter your review and rating");
            resolve(false);
          } else {
            resolve(true);
          }
        });
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const rating = document.querySelector(
          'input[name="star-input"]:checked'
        ).value;
        const review = document.getElementById("review-input").value;

        console.log("Rating:", typeof rating);
        console.log("Review:", typeof review);

        await axios.post(
          `http://localhost:5001/api/users/current/review/${productid}`,
          { numStars: Number(rating), comment: review },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setController(!controller);
      }
    });
  };

  const displayDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  const displayName = (name) => {
    const words = name.split(" ");
    const abbreviatedWords = words.map((word) => {
      const firstCharacter = word.charAt(0);
      return firstCharacter + "***";
    });
    return abbreviatedWords.join(" ");
  };
  const scrollToReviews = () => {
    const reviewSection = document.querySelector("#product-reviews");
    if (reviewSection) {
      reviewSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="product-page-div">
      <Header userRetriever={retrieveUser} />
      {isLoading ? (
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
      ) : isValidId ? (
        <div className="product-page-content">
          <div className="product-page-image-and-details">
            <img
              className="product-page-product-image"
              src={`${product.imgUrl}`}
              alt=""
            />
            <div className="product-page-product-details">
              <h2 className="product-page-product-name">{`${product.name}`}</h2>
              <a
                style={{ textDecoration: "none", color: "#542811" }}
                href="#product-reviews"
              >
                <div className="product-page-stars">
                  {showAvgStars(product.avgStars, product.reviews.length)}
                </div>
              </a>
              <span style={{ cursor: "pointer" }} onClick={writeReview}>
                Write a review
              </span>

              <span className="product-page-price">{`Price: ${product.price.toLocaleString()} TL`}</span>
              <h4
                style={{
                  fontSize: "1.2rem",
                  paddingTop: "30px",
                  paddingBottom: "10px",
                }}
              >
                About this product
              </h4>
              <ul>
                {product.features.map((e, i) => (
                  <li className="product-page-feature">{`${e}`}</li>
                ))}
              </ul>
            </div>
            <div className="product-page-add-cart-or-fav">
              <div className="product-page-sidebutton-div">
                {isFav ? (
                  <FontAwesomeIcon
                    onClick={() => {
                      handleFav();
                    }}
                    className="product-page-sidebutton-icon"
                    id="product-page-sidebutton-favorites"
                    icon={fasHeart}
                  />
                ) : (
                  <FontAwesomeIcon
                    onClick={() => {
                      handleFav();
                    }}
                    className="product-page-sidebutton-icon"
                    id="product-page-sidebutton-favorites"
                    icon={farHeart}
                  />
                )}

                {isFav ? (
                  <h1 className="product-page-h1">
                    <span className="product-page-sidebutton-text">
                      Remove{" "}
                    </span>
                    <span className="product-page-sidebutton-text">from </span>
                    <span className="product-page-sidebutton-text">
                      Favorites
                    </span>
                  </h1>
                ) : (
                  <h1 className="product-page-h1">
                    <span className="product-page-sidebutton-text">Add </span>
                    <span className="product-page-sidebutton-text">to </span>
                    <span className="product-page-sidebutton-text">
                      Favorites
                    </span>
                  </h1>
                )}
              </div>
              <div className="product-page-sidebutton-div">
                <FontAwesomeIcon
                  onClick={() => handleCart()}
                  className="product-page-sidebutton-icon"
                  icon={faCartShopping}
                />
                <h1 className="product-page-h1">
                  <span className="product-page-sidebutton-text">Add </span>
                  <span className="product-page-sidebutton-text">to </span>
                  <span className="product-page-sidebutton-text">Cart</span>
                </h1>
              </div>
              <div className="product-page-sidebutton-div">
                <FontAwesomeIcon
                  className="product-page-sidebutton-icon"
                  icon={faCreditCard}
                />
                <h1 className="product-page-h1">
                  <span className="product-page-sidebutton-text">Proceed </span>
                  <span className="product-page-sidebutton-text">to </span>
                  <span className="product-page-sidebutton-text">Buy</span>
                </h1>
              </div>
            </div>
          </div>
          {product.reviews.length > 0 ? (
            <div id="product-reviews">
              <h1 className="product-review-header">Reviews</h1>
              {product.reviews.map((e, i) => (
                <div className="product-review-card">
                  <div className="stars-and-comment">
                    {showStars(e.numStars)}
                    <p className="review-comment">{`${e.comment}`}</p>
                  </div>
                  <div className="review-user-info">
                    <span id="review-user-name-date">{`${displayName(
                      e.reviewOwnerName
                    )} | ${displayDate(e.createdAt)}`}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="product-could-not-be-found-page">
          <h1
            style={{
              textAlign: "center",
              padding: "40px",
              paddingBottom: "80vh",
            }}
          >
            Product Could Not Be Found!
          </h1>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Product;
