import React from "react";
import "./WrongUrl.css";
import Header from "../header/Header";

function WrongUrl() {
  return (
    <div>
      <Header />
      <h1 id="wrong-url">{`Sorry, We Couldn't Find the Page You Are Looking For :(`}</h1>
    </div>
  );
}

export default WrongUrl;
