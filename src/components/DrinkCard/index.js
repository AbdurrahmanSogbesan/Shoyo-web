import { Button, ButtonGroup } from "@material-ui/core";
import React from "react";
import "./DrinkCard.css";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Bottle from "../../images/bottle.png";

function DrinkCard({
  backgroundColor,
  gradientColor,
  title,
  add,
  subtract,
  itemCount,
  description,
}) {
  return (
    <div className="overlay">
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
            <Button onClick={subtract}>
              <RemoveIcon fontSize="small" />
            </Button>
            <Button>{itemCount}</Button>
            <Button onClick={add}>
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <span className="drink-desc">{description}</span>
    </div>
  );
}

export default DrinkCard;
