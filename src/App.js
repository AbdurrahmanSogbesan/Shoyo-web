import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Cart from "./Cart";
import Orders from "./Orders";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import { auth } from "./firebase/firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            email: authUser.email,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <BrowserRouter>
      {!user.payload ? (
        <Login />
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
