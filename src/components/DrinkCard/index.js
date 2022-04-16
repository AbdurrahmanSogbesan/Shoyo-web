import React from "react";
import "./DrinkCard.css";

function DrinkCard({ backgroundColor, gradientColor, title }) {
  return (
    <div
      className="container"
      style={{
        background: `linear-gradient(${backgroundColor}, ${gradientColor})`,
      }}
    >
      <span className="drinkTitle">{title}</span>
      <div className="backgroundCirlce"></div>
      <img
        className="drinkImage"
        src="https://freepngimg.com/thumb/bottle/12-water-plastic-bottle-png-image.png"
        alt="bottle"
      />
    </div>
  );
}

export default DrinkCard;
