/** @format */

import React, { useContext } from "react";
import Products from "../Products/Products";
import CategorySlider from "../CategorySlider/CategorySlider";
// import style from"./Home.modules.C"
import MainSlider from "./../MainSlider/MainSlider";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Home() {
  let { CountWishlist, setCountWishlist } = useContext(WishlistContext);
  return (
    <div className="container mx-auto max-w-screen-xl ">
      <MainSlider />
      <CategorySlider />
      <Link to="/wishlist" className="bg-gray-200 px-4 py-2 rounded-lg mt-10 text-gray-800  transition duration-300 hover:bg-yellow-600 hover:text-white text-center p-2 capitalize">
        Go to Wishlist
        <span className="ml-1  bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {CountWishlist}
        </span>
      </Link>

      <Products />
    </div>
  );
}
