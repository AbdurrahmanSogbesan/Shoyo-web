import React from "react";
import DrinkCard from "./components/DrinkCard";
import "./App.css";

function App() {
  const drinks = [
    {
      title: "Raspberry Kombucha",
      backgroundColor: "#D4311B",
      gradientColor: "pink",
    },
    {
      title: "Greenapple Kombucha",
      backgroundColor: "#2A9C0C",
      gradientColor: "lightgreen",
    },
    {
      title: "Lemonade Kombucha",
      backgroundColor: "#BEB218",
      gradientColor: "yellow",
    },
  ];
  return (
    <div className="app">
      {drinks.map((drink, index) => (
        <DrinkCard
          key={index}
          title={drink.title}
          backgroundColor={drink.backgroundColor}
          gradientColor={drink.gradientColor}
        />
      ))}
    </div>
  );
}

export default App;
