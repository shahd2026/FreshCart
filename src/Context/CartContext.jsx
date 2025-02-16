/** @format */

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };
  const [cartId, setcartId] = useState(0)
  const [itemNum, setitemNum] = useState(0)

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function showAddedProductsCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => { 
        //console.log(res.data.numOfCartItems , "res for count");
        setitemNum(res.data.numOfCartItems)
        setcartId(res.data.data._id)
        return res})
      .catch((err) => err);
  }

  function updateCartCount(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function removeItem(productId) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function Checkout(cartId, url, formValues) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      { shippingAddress: formValues }, {headers}
    )
    .then((res) => res)
    .catch((err) => err);
  }
useEffect(()=>{showAddedProductsCart()},[])
  return (
    <CartContext.Provider
      value={{ cartId, addToCart, showAddedProductsCart, updateCartCount, removeItem, Checkout, itemNum, setitemNum}}
    >
      {props.children}
    </CartContext.Provider>
  );
}
