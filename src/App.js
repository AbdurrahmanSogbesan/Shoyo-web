import React from "react";
import DrinkCard from "./components/DrinkCard";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function App() {
  const drinks = [
    {
      title: "Raspberry Kombucha",
      backgroundColor: "#D4311B",
      gradientColor: "pink",
    },
    {
      title: "Purpleberry Kombucha",
      backgroundColor: "purple",
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
    {
      title: "Orange Kombucha",
      backgroundColor: "coral",
      gradientColor: "yellow",
    },
    {
      title: "Mango Kombucha",
      backgroundColor: "orange",
      gradientColor: "yellow",
    },
  ];
  var settings = {
    slidesToShow: 3,
    infinite: true,
    dots: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <div className="app">
      <Slider {...settings}>
        {drinks.map((drink, index) => (
          <DrinkCard
            key={index}
            title={drink.title}
            backgroundColor={drink.backgroundColor}
            gradientColor={drink.gradientColor}
          />
        ))}
      </Slider>
    </div>
  );
}

export default App;
