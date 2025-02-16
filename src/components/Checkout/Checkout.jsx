/** @format */

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {

  let {Checkout} =  useContext(CartContext)

  let {cartId} = useContext(CartContext)

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: ()=>CheckoutKobry(cartId, `http://localhost:5173`),
  });

  

  async function CheckoutKobry(cartId, url){
   let {data} = await Checkout(cartId, url , formik.values)
   window.location.href = data.session.url
   
  }
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
      border-gray-300 appearance-none:text-white:border-gray-600 dark:focus:border-emerald-500 focus:outline-none
       focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
             Details Address
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none:text-white:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute left-0 text-sm
     text-gray-500:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 
     origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
      peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
       peer-focus:-translate-y-6"
          >
            city
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none:text-white:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute left-0 text-sm
     text-gray-500:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 
     origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
      peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
       peer-focus:-translate-y-6"
          >
            phone
          </label>
        </div>

        <div className="flex items-center gap-4 capitalize">
          <button
            type="submit"
            className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center:bg-emerald-600:hover:bg-emerald-600:focus:ring-emerald-800"
          > Pay now</button>
          
        </div>
      </form>
    </>
  );
}
