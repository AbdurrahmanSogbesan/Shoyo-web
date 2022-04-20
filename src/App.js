import React, { useState } from "react";
import DrinkCard from "./components/DrinkCard";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Sidebar from "./components/Sidebar";

function App() {
  const drinks = [
    {
      title: "Strawberry",
      backgroundColor: "#D4311B",
      gradientColor: "pink",
    },
    {
      title: "Blueberry",
      backgroundColor: "purple",
      gradientColor: "pink",
    },
    {
      title: "Apple",
      backgroundColor: "#2A9C0C",
      gradientColor: "lightgreen",
    },
    {
      title: "Banana",
      backgroundColor: "#BEB218",
      gradientColor: "yellow",
    },
    {
      title: "Pineapple",
      backgroundColor: "coral",
      gradientColor: "yellow",
    },
    {
      title: "Orange",
      backgroundColor: "orange",
      gradientColor: "yellow",
    },
  ];
  var settings = {
    slidesToShow: 3,
    infinite: true,
    dots: false,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    // pauseOnHover: true,
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
  const [total, setTotal] = useState(0);
  return (
    <div className="app" id="outer-container">
      <Sidebar
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        badgeContent={total}
      />
      <div id="page-wrap">
        <Slider {...settings}>
          {drinks.map((drink, index) => (
            <DrinkCard
              key={index}
              title={drink.title}
              backgroundColor={drink.backgroundColor}
              gradientColor={drink.gradientColor}
              setTotal={setTotal}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default App;
