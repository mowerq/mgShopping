import React, { useEffect, useState } from "react";
import "./Cart.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
function Cart() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [updated, setUpdated] = useState(true);
  const [subTotal, setSubTotal] = useState(0);
  const accessToken = localStorage.getItem("accessToken");

  const retrieveUser = (loggedInUser) => {
    setSubTotal(loggedInUser.cart.totalCost);
    setUser(loggedInUser);
    setIsLoading(false);
  };
  const navigate = useNavigate();
  const goHomepage = () => {
    navigate("/");
  };
  useEffect(() => {}, [subTotal]);
  const handleCart = async (productid, quantityChange) => {
    if (accessToken !== "") {
      try {
        let cartProducts = user.cart.products;
        for (let i = 0; i < cartProducts.length; i++) {
          if (cartProducts[i].productId === productid) {
            if (quantityChange === 0) {
              cartProducts.splice(i, 1);
            } else {
              cartProducts[i].quantity += quantityChange;
            }
            break;
          }
        }
        setUpdated(!updated);

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
        setSubTotal(response.data.totalCost);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div id="cart">
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
      ) : (
        <div className="cart-page-content">
          <div className="buy-cart">
            <h4 className="sub-total-price">{`Sub total: ${subTotal.toLocaleString()}`}</h4>
            <button className="proceed-checkout">Proceed to checkout</button>
          </div>
          <div className="cart-container">
            {user.cart.products.length === 0 ? (
              <div className="cart-card">
                <div className="card-content">
                  <FontAwesomeIcon
                    className="cart-shopping-cart-icon"
                    icon={faCartShopping}
                  />
                  <span className="no-product-cart-text">
                    You have no product on your cart!
                  </span>
                </div>

                <button onClick={goHomepage} className="start-shopping">
                  Start Shopping
                </button>
              </div>
            ) : (
              user.cart.products.map((e, i) => (
                <div className="product-card">
                  <div className="product-content">
                    <img
                      src={`${e.imgUrl}`}
                      alt="Product Image"
                      className="product-image"
                    />
                    <div className="product-details-and-price">
                      <div className="product-details">
                        <span className="product-name">{`${e.name}`}</span>
                      </div>
                      <div className="product-price-and-delete">
                        <div className="product-amount">
                          <button
                            onClick={() => {
                              if (e.quantity > 1) {
                                handleCart(e.productId, -1);
                                const price = document.getElementById(
                                  `product-price-${i}`
                                );
                                price.innerHTML = (
                                  e.productPrice * e.quantity
                                ).toLocaleString();
                              }
                            }}
                            className="decrease-amount"
                          >
                            -
                          </button>
                          <span
                            id={`amount-input-${i}`}
                            className="amount-input"
                          >
                            {`${e.quantity}`}
                          </span>
                          <button
                            onClick={() => {
                              handleCart(e.productId, 1);
                              const price = document.getElementById(
                                `product-price-${i}`
                              );
                              price.innerHTML = (
                                e.productPrice * e.quantity
                              ).toLocaleString();
                            }}
                            className="increase-amount"
                          >
                            +
                          </button>
                        </div>
                        <span
                          id={`product-price-${i}`}
                          className="product-price"
                        >
                          {`${(e.productPrice * e.quantity).toLocaleString()}`}{" "}
                          TL
                        </span>
                        <FontAwesomeIcon
                          onClick={() => {
                            handleCart(e.productId, 0);
                          }}
                          className="card-trash-icon"
                          icon={faTrash}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Cart;
