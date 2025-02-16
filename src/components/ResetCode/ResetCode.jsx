/** @format */

import React, { useState } from "react";
// import style from"./Register.modules.C"
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import {  useNavigate } from "react-router-dom";


export default function ResetCode() {

  let navigate = useNavigate();

  async function handlrecode(values) {
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );
      console.log(response);
  
      if (response.data.status  === "Success") {
        console.log("Password reset request successful!");
        navigate("/NewPass");
      } else {
        console.log("Unexpected response Forget:", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data.message);
      } else {
        console.error("Network Error:", error.message);
      }
    }
  }

  let MyYup = yup.object().shape({
    resetCode: yup
      .string()
      .matches(/^\d+$/, "Reset code must contain only numbers")
      .required("Reset code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: MyYup,
    onSubmit: handlrecode,
  });

return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        
          
            <svg
              className="shrink-0 w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Error</span>
           
          
        

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="resetCode"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
              border-gray-300 appearance-none:text-white:border-gray-600 dark:focus:border-emerald-500 focus:outline-none
               focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="resetCode"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your 6-digits code
          </label>

          {formik.errors.resetCode && formik.touched.resetCode ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
              role="alert"
            >
              <svg
                className="shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Error</span>
              <div>
                <span className="font-medium">{formik.errors.resetCode}</span>
              </div>
            </div>
          ) : null}

            <div className="flex items-center gap-4 capitalize">
                  <button
                    type="submit"
                    className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center:bg-emerald-600:hover:bg-emerald-600:focus:ring-emerald-800"
                  >
                     Submit 
                  </button>
                 
                  </div>
        </div>
      </form>
    </>
  );
}

