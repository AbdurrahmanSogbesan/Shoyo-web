import React, { useRef, useState } from "react";
import DrinkCard from "./components/DrinkCard";
import "./Cart.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Sidebar from "./components/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import checkoutSchema from "./schemas/checkout";
import { auth, db } from "./firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";
import TextInput from "./components/TextInput";
import emailjs from "@emailjs/browser";
import { selectUser } from "./features/appSlice";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import NextArrow from "./components/Icon/icons/nextArrow";
import PreviousArrow from "./components/Icon/icons/prevArrow";

function Cart() {
  const drinks = [
    {
      id: 0,
      title: "Strawberry",
      backgroundColor: "#D4311B",
      gradientColor: "pink",
      description:
        "Our most iconic cake, reimagined. A top-secret strawberry and watermelon syrup with Milk Lab Almond Milk combine for a transcendent sip, straight from heaven",
    },
    {
      id: 1,
      title: "Blueberry",
      backgroundColor: "purple",
      gradientColor: "pink",
      description:
        "A decadent hot chocolate inspired by our Chocolate Mirage Cake. Rooibos Tea, caramel and Madagascan Manjari Chocolate combine for a unique butterscotch flavour",
    },
    {
      id: 2,
      title: "Apple",
      backgroundColor: "#2A9C0C",
      gradientColor: "lightgreen",
      description:
        "A twist on the classic espresso blend. Never bitter, perfect for all your milk coffees and those who like their espresso with a kick.",
    },
    {
      id: 3,
      title: "Banana",
      backgroundColor: "#BEB218",
      gradientColor: "yellow",
      description:
        "Your new summer favourite. Only available when mangoes are in season, this blend is a must-try for all mango lovers.  ",
    },
    {
      id: 4,
      title: "Pineapple",
      backgroundColor: "coral",
      gradientColor: "yellow",
      description:
        "Fresh pineapple juice, blended with our signature milk tea. This is the perfect drink for those who love a sweet and sour taste",
    },
    {
      id: 5,
      title: "Orange",
      backgroundColor: "orange",
      gradientColor: "yellow",
      description:
        "A mix of orange juice and our signature milk tea. It is sweet and sour, and is perfect for those who love a refreshing drink",
    },
  ];
  var settings = {
    slidesToShow: 3,
    infinite: true,
    dots: false,
    slidesToScroll: 1,
    lazyLoad: true,

    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "60px",
          className: "center",
          centerMode: true,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "60px",
          className: "center",
          centerMode: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "60px",
          className: "center",
          centerMode: true,
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

  const inputData = [
    {
      label: "Full Name",
      htmlFor: "fname",
      id: "fname",
      name: "fullName",
      value: "fullName",
      placeholder: "John M. Doe",
    },
    {
      label: "Email",
      htmlFor: "email",
      id: "email",
      name: "email",
      value: "email",
      placeholder: "john@example.com",
    },
    {
      label: "Phone Number",
      htmlFor: "number",
      id: "number",
      name: "phone",
      value: "phone",
      placeholder: "+2349174041321",
    },
    {
      label: "Address",
      htmlFor: "address",
      id: "address",
      name: "address",
      value: "address",
      placeholder: "542 W. 15th Street",
    },
  ];
  const [cart, setCart] = useState([]);
  const form = useRef();
  const user = useSelector(selectUser);

  const checkoutInitialValues = {
    fullName: user?.payload?.userName || "",
    email: user?.payload?.email || "",
    phone: "",
    address: "",
    instructions: "",
    items: [],
  };

  const sendOrder = async (values) => {
    await addDoc(collection(db, "orders"), values);
  };

  const sendEmail = (obj) => {
    emailjs
      .send("service_p2w9bmj", "template_pmcqbuj", obj, "OQMKfs-HjMH1yclVU")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
          toast.error(
            error,
            { position: toast.POSITION.TOP_CENTER },
            { autoClose: 10000 }
          );
        }
      );
  };

  const formik = useFormik({
    initialValues: checkoutInitialValues,
    validationSchema: checkoutSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const item = values.items.map((item) => `${item.name} - ${item.qty}`);
      if (values.items.length === 0) {
        toast.error(
          "Please add items to your cart",
          { position: toast.POSITION.TOP_CENTER },
          { autoClose: 10000 }
        );
        return;
      }
      try {
        sendOrder({
          ...values,
          timestamp: Date.now(),
        });
        sendEmail({
          ...values,
          instruction: values["instructions"],
          items: item.map((item) => item),
        });

        cart.length = 0;
        toast.success(
          "Order Successful!",
          { position: toast.POSITION.TOP_CENTER },
          { autoClose: 10000 }
        );
        toast.clearWaitingQueue();
        formik.resetForm();
      } catch (error) {
        toast.error(
          error,
          { position: toast.POSITION.TOP_CENTER },
          { autoClose: 10000 }
        );
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (cart.length > 0) {
      formik.setFieldValue("items", cart);
    }
  }, [cart]);

  const { errors, values, setFieldValue, touched, handleBlur, handleSubmit } =
    formik;

  const sum = cart.reduce((accumulator, object) => {
    return accumulator + object.qty;
  }, 0);

  const addToCart = (drinkId, drinkName) => {
    const drinkInCartIndex = cart.findIndex((c) => c.id === drinkId);
    const newCart = cart.slice();
    const drinkInCart = cart[drinkInCartIndex];
    if (drinkInCartIndex >= 0) {
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
  const navigate = useNavigate();
  const goToOrdersPage = () => {
    const isAdmin = user?.payload?.email === "abdurrahman0803@gmail.com";
    isAdmin
      ? navigate("/orders")
      : toast.error(
          "You are not authorized to view this page",
          { position: toast.POSITION.TOP_CENTER },
          { autoClose: 10000 }
        );
  };

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

          <span onClick={goToOrdersPage} className="ordersLink">
            Go to Orders page
          </span>
          <h2>Checkout</h2>
          <form className="checkoutForm" onSubmit={handleSubmit} ref={form}>
            {inputData.map((data, index) => {
              return (
                <TextInput
                  key={index}
                  label={data.label}
                  htmlFor={data.htmlFor}
                  id={data.id}
                  name={data.name}
                  value={values[data.value]}
                  onChange={(e) => setFieldValue(data.value, e.target.value)}
                  touched={touched[data.value]}
                  placeholder={data.placeholder}
                  onBlur={handleBlur}
                  error={errors[data.value]}
                  // {...formik.getFieldProps(data.value)}
                />
              );
            })}

            <label htmlFor="instruction">Special Instructions</label>
            <textarea
              name="instruction"
              rows={5}
              placeholder="Enter instructions here..."
              error={errors["instructions"]}
              value={values["instructions"]}
              onChange={(e) => setFieldValue("instructions", e.target.value)}
              onBlur={handleBlur}
              id="instruction"
              // {...formik.getFieldProps("instructions")}
            ></textarea>

            <label htmlFor="items">Items Bought</label>
            <ul id="items" name="items">
              {cart.map((c, index) => {
                return (
                  <li key={index}>
                    {c.name} - {c.qty}
                    <input
                      type="hidden"
                      name={`items`}
                      value={`${c.name} - ${c.qty}`}
                    ></input>
                  </li>
                );
              })}
            </ul>
            <button
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              className="submitButton"
            >
              Submit
            </button>
          </form>
        </div>
      </Sidebar>
      <div className="logo">
        <span className="logo-name">
          <RiceBowlIcon
            sx={{ fontSize: "28px", color: "#6d7ae0", mr: "10px" }}
          />
          Shoyo's Creamery
        </span>
        <Button
          variant="contained"
          color="primary"
          onClick={() => auth.signOut()}
          className="logout-button"
          size="medium"
        >
          Sign Out
        </Button>
      </div>
      <span onClick={goToOrdersPage} className="ordersLink orderLink2">
        Orders
      </span>

      <div id="page-wrap">
        <span className="available-drinks"> Available Drinks</span>

        <span className="drink-cards">
          <Slider {...settings}>
            {drinks.map((drink, index) => {
              return (
                <DrinkCard
                  key={index}
                  title={drink.title}
                  backgroundColor={drink.backgroundColor}
                  gradientColor={drink.gradientColor}
                  description={drink.description}
                  itemCount={getItemCount(drink.id)}
                  add={() => addToCart(drink.id, drink.title)}
                  subtract={() => reduceCart(drink.id)}
                />
              );
            })}
          </Slider>
        </span>

        <ToastContainer limit={1} />
      </div>
    </div>
  );
}

export default Cart;
