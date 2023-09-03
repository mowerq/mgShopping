import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./SearchButton.css";
const SearchButton = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleSearchButtonClick = () => {
    setIsInputVisible(true);
  };

  const handleCancelSearch = () => {
    setIsInputVisible(false);
  };

  return (
    <div>
      <button
        className="header-user-button header-search"
        onClick={handleSearchButtonClick}
      >
        <FontAwesomeIcon icon={faSearch} title="Search" />
      </button>
      {isInputVisible && (
        <div className="full-width-search-bar">
          <button onClick={handleCancelSearch} className="cancel-search">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <input
            id="header-search-text-input-full-width"
            type="text"
            placeholder="Search a product"
            maxLength={50}
          />
          <button className="search-button-full-width">
            <FontAwesomeIcon color="white" icon={faSearch} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchButton;
