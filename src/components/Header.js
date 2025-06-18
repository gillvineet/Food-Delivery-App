import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
const Header = () => {

const onlineStatus = useOnlineStatus();
  useEffect(() => {}, []);
  //selector is a hook /subscribing to the store using a selector
  const cartItems = useSelector((store) => store.cart.items);
const cartItemsLength = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="flex justify-between bg-pink-100 shadow-lg mb-2">
      <div className="logo_contaier">
        <img className="w-40" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4 font-bold ">
            <Link to="/cart">Cart - ({cartItemsLength} items)</Link>
          
          </li>
          <button
            className="Login"
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              window.location.href = "/login";
            }}
          >
            LogOut
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
