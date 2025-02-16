import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-white py-8 border-t border-[#21B421]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10">
        
        <div className="space-y-2">
          <h2 onClick={()=>window.scrollTo({top:0, behavior: "smooth"})} className="text-2xl cursor-pointer font-bold text-[#21a431]">FreshCart</h2>
          <p className="text-sm text-gray-600">
            Your go-to online store for the best deals. Shop smart, shop easy!
          </p>
        </div>

        <div>
            <h3 className="text-2xl font-semibold mb-4 after:block after:w-full after:h-[2px] after:bg-fuchsia-900 after:mt-2">
              Quick Links
            </h3>
            <ul className="text-gray-600  text-sm flex  items-center justify-center gap-2">
              <li>
                <Link
                  to=""
                  className="hover:text-green-600 font-bold transition-all"
                >
                  <i class="fas fa-star text-yellow-400 mr-2"></i>
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="categories"
                  className="hover:text-green-600 font-bold transition-all"
                >
                  <i class="fas fa-star text-yellow-400 mr-2"></i>
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="brands"
                  className="hover:text-green-600 font-bold transition-all"
                >
                  <i class="fas fa-star text-yellow-400 mr-2"></i>
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  to="wishlist"
                  className="hover:text-green-600 font-bold transition-all"
                >
                  <i class="fas fa-star text-yellow-400 mr-2"></i>
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="cart"
                  className="hover:text-green-600 font-bold transition-all"
                >
                  <i class="fas fa-star text-yellow-400 mr-2"></i>
                  Cart
                </Link>
              </li>
            </ul>
          </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">Stay Updated</h3>
          <p className="text-sm text-gray-600">Subscribe for the latest deals.</p>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 text-gray-700 w-full focus:outline-none"
            />
            <button className="bg-[#21B421] px-4 text-white hover:bg-[#21a431] transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row border-[#21B421] justify-between items-center text-sm text-gray-600 border-t  mt-6 pt-4 px-4 md:px-10">
        <ul className="flex gap-4">
          <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook text-xl hover:text-green-500"></i></a></li>
          <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram text-xl hover:text-green-500"></i></a></li>
          <li><a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube text-xl hover:text-green-500"></i></a></li>
          <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter text-xl hover:text-green-500"></i></a></li>
          <li><a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok text-xl hover:text-green-500"></i></a></li>
        </ul>
        <p className="mt-3  md:mt-0 "> All rights reserved. <span className="text-pink-900 font-bold"> Shahd Mohamed Mohamed Aly </span></p>
      </div>
    </footer>
  );
}
