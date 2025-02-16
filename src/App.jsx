/** @format */

// import { useState } from 'react'

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import About from "./components/About/About";
import NotFound from "./components/NotFound/NotFound";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Products from "./components/Products/Products";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout/Checkout";
import Allorders from './components/Allorders/Allorders';
import Wishlist from "./components/Wishlist/Wishlist";
import WishlistProvider from "./Context/WishlistContext";
import Repass from './components/Repass/Repass';
import NewPass from './components/NewPass/NewPass';
import ResetCode from './components/ResetCode/ResetCode';

export function App() {
  let query = new QueryClient();

  let paths = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Allorders />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "repass",
          element: (
              <Repass />
      
          ),
        },
        {
          path: "newpass",
          element: (
              <NewPass />
          ),
        },
        {
          path: "resetcode",
          element: (
       
              <ResetCode />
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={query}>
          <CartContextProvider>
            <WishlistProvider>
            <RouterProvider router={paths} />
            <Toaster />
            </WishlistProvider>
          </CartContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
