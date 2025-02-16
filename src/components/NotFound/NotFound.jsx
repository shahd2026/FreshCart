import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-6xl md:text-8xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
        Oops! You seem to be lost.
      </p>
      <p className="text-gray-500 mb-6">
        The page you're looking for doesn't exist or an error occurred.
      </p>
      <Link
        to="/"
        className="bg-[#3cbd3d] text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 hover:bg-blue-600"
      >
        Go Home 🏠
      </Link>
    </div>
  );
}

