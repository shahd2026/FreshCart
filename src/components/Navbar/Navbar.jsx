/** @format */

import React, { useContext } from "react";
// import style from"./Navbar.modules.C"
import Categories from "./../Categories/Categories";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { LoginToken, setLoginToken } = useContext(UserContext);
  let { itemNum } = useContext(CartContext);

  function signOut() {
    localStorage.removeItem("userToken");
    setLoginToken(null);
    navigate("/login");
  }

  return (
    <>
      (
        <nav className="bg-slate-300 fixed top-0 z-50 left-0 right-0 border-gray-200">
  <div className="flex flex-wrap justify-center lg:justify-between gap-5 items-center mx-auto max-w-screen-xl p-4">
    <div  className="flex items-center">
      <Link
      onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}

        href=""
        className="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <img
          src={logo}
          className="h-8"
          alt="Flowbite Logo"
          width={"120px"}
        />
      </Link>

      {LoginToken != null ? (
        <ul className="flex gap-3 ml-5">
          <li>
            <NavLink
              className="relative text-slate-600 transition duration-300 ease-in-out hover:text-gray-900 font-medium 
                         after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
              to=""
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="relative mr-2 text-slate-600 transition duration-300 ease-in-out hover:text-gray-900 font-medium 
                         after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
              to="/cart"
            >
              Cart
              <span className=" bg-[#21B421] absolute top-[-5px] text-white px-1  text-xs font-semibold  rounded-full">
                {itemNum}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="relative text-slate-600 transition duration-300 ease-in-out hover:text-gray-900 font-medium 
                         after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
              to="/products"
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              className="relative text-slate-600 transition duration-300 ease-in-out hover:text-gray-900 font-medium 
                         after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
              to="/categories"
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              className="relative text-slate-600 transition duration-300 ease-in-out hover:text-gray-900 font-medium 
                         after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
              to="/brands"
            >
              Brands
            </NavLink>
          </li>
          <li>
            <NavLink
              className="relative text-slate-600 transition duration-300 ease-in-out hover:text-gray-900 font-medium 
                         after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
              to="/allorders"
            >
              All Orders
            </NavLink>
          </li>
        </ul>
) : null}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <ul className="flex gap-3 ">
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook hover:text-green-500"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram hover:text-green-500"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube hover:text-green-500"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter hover:text-green-500"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-tiktok hover:text-green-500"></i>
                </a>
              </li>
            </ul>

            <ul className="flex gap-5">
              {LoginToken != null ? (
                <li onClick={signOut}>
                  <Link to="">Sign-out</Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="Login">Login</Link>
                  </li>
                  <li>
                    <Link to="Register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      )
    </>
  );
}
