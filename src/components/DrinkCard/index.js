import { Button, ButtonGroup } from "@material-ui/core";
import React, { useState } from "react";
import "./DrinkCard.css";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Bottle from "../../images/bottle.png";

function DrinkCard({ backgroundColor, gradientColor, title, setTotal }) {
  const [itemCount, setItemCount] = useState(0);
  const handleAdd = () => {
    setItemCount(itemCount + 1);
  };
  const handleSub = () => {
    setItemCount(Math.max(itemCount - 1, 0));
  };
  const handleClick = () => {
    setTotal((prevState) => prevState + itemCount);
    setItemCount(0);
  };

  return (
    <div
      className="container"
      style={{
        background: `linear-gradient(${backgroundColor}, ${gradientColor})`,
      }}
    >
      <span className="drinkTitle">{title}</span>
      <div className="backgroundCirlce"></div>
      <div className="drinkImage">
        <img src={Bottle} alt="bottle" />
      </div>
      <div className="cart">
        <ButtonGroup className="buttonGroup">
          <Button
            onClick={() => {
              handleSub();
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button>{itemCount}</Button>
          <Button onClick={() => handleAdd()}>
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
        <Button variant="outlined" onClick={() => handleClick()}>
          Add To Cart
        </Button>
      </div>
    </div>
  );
}

export default DrinkCard;
