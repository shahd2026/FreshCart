/** @format */

import React, { useState } from "react";
// import style from"./Register.modules.C"
import { useFormik } from "formik";
import values from "./../../../node_modules/lodash-es/values";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Login from './../Login/Login';
import { UserContext } from "../../Context/UserContext";
import { useContext } from 'react';

export default function Register() {
  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Name must contain at least 3 characters")
      .max(12, "The name you entered is too long")
      .required("Please enter your name"),

    email: yup
      .string()
      .email("Invalid email address")
      .required("Please enter your email"),

    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Please enter a strong password with at least one uppercase letter, one number, and one special character (@$!%*?&)"
      )
      .required("Please enter a strong password")
      .min(6, "Password must be at least 6 characters long"),

    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),

    phone: yup.string().matches(/^01[0125][0-9]{8}$/).required("Please Enter your phone number"),
  });

  let navigate = useNavigate();
  const [apiResError, setapiResError] = useState(``);
  const [isLoading, setisLoading] = useState(false);
    let {LoginToken,setLoginToken} = useContext(UserContext)

  function handleRegister(formValues) {
    setisLoading(true)
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
      .then((apiRes) => {
        setisLoading(false)
        if (apiRes?.data?.message  ==="success"){
          localStorage.setItem("userToken",apiRes.data.token)
          setLoginToken(apiRes.data.token)
          navigate(`/`);

        }
      })
      .catch((apiRes) => {
        setisLoading(false)
        setapiResError(apiRes?.response?.data?.message);
      });
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handleRegister,
    validationSchema,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        {apiResError ? (
          <div
            className="flex items-center gap-4 my-7 p-3 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
            role="alert"
          >
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
            <div>
              <span className="font-medium">{apiResError}</span>
            </div>
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none:text-white:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600
     peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Name
          </label>

          {formik.errors.name && formik.touched.name ? (
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
                <span className="font-medium">{formik.errors.name}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
      border-gray-300 appearance-none:text-white:border-gray-600 dark:focus:border-emerald-500 focus:outline-none
       focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email address
          </label>

          {formik.errors.email && formik.touched.email ? (
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
                <span className="font-medium">{formik.errors.email}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none:text-white:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute left-0 text-sm
     text-gray-500:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 
     origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
      peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
       peer-focus:-translate-y-6"
          >
            Password
          </label>

          {formik.errors.password && formik.touched.password ? (
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
                <span className="font-medium">{formik.errors.password}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="repassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none:text-white:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="repassword"
            className="peer-focus:font-medium absolute left-0 text-sm
     text-gray-500:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 
     origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
      peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
      peer-focus:-translate-y-6"
          >
            retype password
          </label>

          {formik.errors.rePassword && formik.touched.rePassword ? (
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
                <span className="font-medium">{formik.errors.rePassword}</span>
              </div>
            </div>
          ) : null}
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
       peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
       peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your phone number
          </label>

          {formik.errors.phone && formik.touched.phone ? (
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
                <span className="font-medium">{formik.errors.phone}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-4 capitalize">
        <button
          type="submit"
          className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center:bg-emerald-600:hover:bg-emerald-600:focus:ring-emerald-800"
        >
          {isLoading? <i className="fas fa-spinner fa-spin"></i> :"Submit"}
        </button>
        <Link to={"/login"}>do you already have an account? <span className=" text-blue-500 underline font-semibold">login</span></Link>
        </div>
      </form>
    </>
  );
}
