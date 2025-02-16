/** @format */

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  let headers = { token: localStorage.getItem("userToken") };
  const [wishlistItems, setWishlistItems] = useState([]);
  const [CountWishlist, setCountWishlist] = useState(0);
  const [targetItems, settargetItems] = useState([])


  function addToWish(Id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: Id },
        { headers }
      )
      .then((res) => {
        setCountWishlist(res.data.count);
        return res;
      })
      .catch((err) => err);
  }

  function getLoggedWish() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => {
        setCountWishlist(res.data.count);
        setWishlistItems(res.data.data);
        settargetItems(res?.data?.data?.map((item)=>item.id))
        console.log(targetItems);
        

        return res;
      })
      .catch((err) => err);
  }

  function removeItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
      .then((res) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== id));
        setCountWishlist((prev) => prev - 1);
        return res;
      })
      .catch((err) => err);
  }
useEffect(()=>{getLoggedWish()
  addToWish()
},[])
  return (
    <WishlistContext.Provider value={{ getLoggedWish, addToWish, removeItem, wishlistItems, setCountWishlist, CountWishlist, targetItems }}>
      {children}
    </WishlistContext.Provider>
  );
}
