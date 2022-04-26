import React, { useState } from "react";
import DrinkCard from "./components/DrinkCard";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Sidebar from "./components/Sidebar";
import { useForm, ValidationError } from "@formspree/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const drinks = [
    {
      id: 0,
      title: "Strawberry",
      backgroundColor: "#D4311B",
      gradientColor: "pink",
    },
    {
      id: 1,
      title: "Blueberry",
      backgroundColor: "purple",
      gradientColor: "pink",
    },
    {
      id: 2,
      title: "Apple",
      backgroundColor: "#2A9C0C",
      gradientColor: "lightgreen",
    },
    {
      id: 3,
      title: "Banana",
      backgroundColor: "#BEB218",
      gradientColor: "yellow",
    },
    {
      id: 4,
      title: "Pineapple",
      backgroundColor: "coral",
      gradientColor: "yellow",
    },
    {
      id: 5,
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
  const [cart, setCart] = useState([]);
  const [state, handleSubmit] = useForm("mjvladnl");

  const sum = cart.reduce((accumulator, object) => {
    return accumulator + object.qty;
  }, 0);

  const addToCart = (drinkId, drinkName) => {
    const drinkInCartIndex = cart.findIndex((c) => c.id === drinkId);
    const newCart = cart.slice();
    if (drinkInCartIndex >= 0) {
      const drinkInCart = cart[drinkInCartIndex];
      drinkInCart.qty += 1;
      newCart[drinkInCartIndex] = drinkInCart;
    } else {
      newCart.push({ id: drinkId, qty: 1, name: drinkName });
    }
    setCart(newCart);
  };

  const reduceCart = (drinkId) => {
    const drinkInCartIndex = cart.findIndex((c) => c.id === drinkId);
    const newCart = cart.slice();
    if (drinkInCartIndex >= 0) {
      const drinkInCart = cart[drinkInCartIndex];
      drinkInCart.qty = Math.max(drinkInCart.qty - 1, 0);
      newCart[drinkInCartIndex] = drinkInCart;
    } else {
      alert("Drink Not in Cart!");
    }
    setCart(newCart);
  };

  const getItemCount = (drinkId) => {
    const drinkInCart = cart.find((c) => c.id === drinkId);
    return drinkInCart?.qty | 0;
  };

  const removeFromCart = (index) => {
    const newCart = cart.slice();

    const filteredCart = newCart.filter((el) => el.id !== index);
    setCart(filteredCart);
  };

  if (state.succeeded) {
    toast.success(
      "Order Successful!",
      { position: toast.POSITION.TOP_CENTER },
      { autoClose: 10000 }
    );
    toast.clearWaitingQueue();
    document.querySelector(".form").reset();
    cart.length = 0;
  }

  return (
    <div className="app" id="outer-container">
      <Sidebar
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        badgeContent={sum}
      >
        <div className="sidebarChildren">
          <h2>Cart</h2>

          <ul className="cartList">
            {cart.map((c, index) => {
              return (
                <div className="cartItems">
                  <li key={index} className="cartItem">
                    {c.name} - {c.qty}
                    <span
                      onClick={() => removeFromCart(c.id)}
                      className="removeButton"
                    >
                      x
                    </span>
                  </li>
                </div>
              );
            })}
          </ul>
          <h2>Checkout</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="fname">Full Name</label>
            <input
              type="text"
              id="fname"
              name="Full Name"
              placeholder="John M. Doe"
            />
            <ValidationError
              prefix="Fname"
              field="fname"
              errors={state.errors}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="Email"
              placeholder="john@example.com"
            ></input>
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <label htmlFor="number">Phone number</label>
            <input
              type="text"
              id="number"
              name="Phone Number"
              placeholder="+2349174041321"
            ></input>
            <ValidationError
              prefix="Number"
              field="number"
              errors={state.errors}
            />
            <label htmlFor="adr">Address</label>
            <input
              type="text"
              id="adr"
              name="Address"
              placeholder="542 W. 15th Street"
            />
            <ValidationError
              prefix="Address"
              field="address"
              errors={state.errors}
            />
            <label htmlFor="instruction">Special Instructions</label>
            <textarea
              name="Instruction"
              rows={5}
              placeholder="Enter text here..."
            ></textarea>
            <ValidationError
              prefix="Instruction"
              field="instruction"
              errors={state.errors}
            />
            <label htmlFor="items">Items Bought</label>
            <ul id="items" name="Items Bought">
              {cart.map((c, index) => {
                return (
                  <li key={index}>
                    {c.name} - {c.qty}
                    <input
                      type="hidden"
                      name="Items Bought"
                      value={`${c.name} - ${c.qty}`}
                    ></input>
                    <ValidationError
                      prefix="items"
                      field="items"
                      errors={state.errors}
                    />
                  </li>
                );
              })}
            </ul>
            <button
              type="submit"
              disabled={state.submitting}
              className="submitButton"
            >
              Submit
            </button>
          </form>
        </div>
      </Sidebar>
      <div id="page-wrap">
        <Slider {...settings}>
          {drinks.map((drink, index) => {
            return (
              <DrinkCard
                key={index}
                title={drink.title}
                backgroundColor={drink.backgroundColor}
                gradientColor={drink.gradientColor}
                itemCount={getItemCount(drink.id)}
                add={() => addToCart(drink.id, drink.title)}
                subtract={() => reduceCart(drink.id)}
              />
            );
          })}
        </Slider>
        <ToastContainer limit={1} />
      </div>
    </div>
  );
}

export default App;
