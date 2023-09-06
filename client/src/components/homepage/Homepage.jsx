import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const imagesArray = [
    "https://marketplace.canva.com/EAFf_LDa9Ro/1/0/1600w/canva-beige-aesthetic-fashion-clothing-collection-medium-banner-7SIG679Cnfw.jpg",
    "https://marketplace.canva.com/EAFYElY5EE4/1/0/1600w/canva-brown-and-white-modern-fashion-banner-landscape-Ap8IU9nEbh8.jpg",
    "https://marketplace.canva.com/EAFGKRRskMs/1/0/1600w/canva-brown-and-beige-minimalist-fashion-banner-lYcbGpUSVGo.jpg",
    "https://marketplace.canva.com/EAE_Aon6n4w/1/0/1600w/canva-brown-modern-fashion-%28banner-%28landscape%29%29-ibvAyn1QnoA.jpg",
    "https://marketplace.canva.com/EAFdkOY1eMU/1/0/1600w/canva-brown-and-cream-modern-jewelry-facebook-shops-ad-ewRm6zuOTts.jpg",
  ];
  const categories = [
    {
      title: "Home & Furniture",
      url: "/categories/homeandfurniture",
      imgurl:
        "https://www.dreamhome.com.tr/mp-include/uploads/2020/07/melisa-ferre.jpg",
    },
    {
      title: "Men's Fashion",
      url: "/categories/men",
      imgurl:
        "https://nextluxury.com/wp-content/uploads/Man-Wearing-Gray-Winter-Coat.jpg",
    },
    {
      title: "Shoes",
      url: "/categories/shoes",
      imgurl:
        "https://assets.adidas.com/images/w_600,f_auto,q_auto/4948095c2bd04bbcb5c2af1601154a02_9366/Stan_Smith_Lux_Shoes_White_HP2201_HM1.jpg",
    },
    {
      title: "Baby Care",
      url: "/categories/baby-care",
      imgurl:
        "https://imgeng.jagran.com/images/2022/dec/baby%20care%20essentials1670231613438.jpg",
    },
    {
      title: "Women's Fashion",
      url: "/categories/women",
      imgurl:
        "https://www.usmagazine.com/wp-content/uploads/2023/02/spring-fashion-trends-2023.jpg?w=1600&h=900&crop=1&quality=86&strip=all",
    },

    {
      title: "Cosmetics",
      url: "/categories/cosmetics",
      imgurl:
        "https://cdn.britannica.com/35/222035-050-C68AD682/makeup-cosmetics.jpg",
    },
    {
      title: "Electronics",
      url: "/categories/electronics",
      imgurl:
        "https://images.pexels.com/photos/705164/computer-laptop-work-place-camera-705164.jpeg",
    },
    {
      title: "Spor & Outdoor",
      url: "/categories/sporandoutdoor",
      imgurl:
        "https://cdn.outsideonline.com/wp-content/uploads/2022/01/GettyImages-1191744336.jpg",
    },
  ];
  const handleLeftArrow = () => {
    if (imageIndex == 0) {
      setImageIndex(imagesArray.length - 1);
    } else {
      setImageIndex((imageIndex) => imageIndex - 1);
    }
  };
  const handleRightArrow = () => {
    if (imageIndex == imagesArray.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex((imageIndex) => imageIndex + 1);
    }
  };

  return (
    <div id="homepage">
      <div id="homepage-carousel">
        <button onClick={handleLeftArrow} id="left-arrow">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <img
          className="homepage-carousel-img"
          src={`${imagesArray[imageIndex]}`}
          alt="Carousel Image"
        />
        <button onClick={handleRightArrow} id="right-arrow">
          {" "}
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div id="main-content">
        {categories.map((e, i) => (
          <div
            onClick={() => {
              navigate(e.url);
            }}
            key={`category-card-${i}`}
            className="category-card"
          >
            {/*<h4 className="category-title">{e.title}</h4>*/}
            <img
              className="category-picture"
              src={e.imgurl}
              alt="Category Picture"
            />
            <p className="category-card-text">
              {e.title}
              <span className="start-shopping-category-card">
                Start Shopping <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
