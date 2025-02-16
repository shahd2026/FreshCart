/** @format */
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Products() {
  const { addToCart, itemNum, setitemNum } = useContext(CartContext);
  const { addToWish, targetItems, removeItem, CountWishlist, setCountWishlist } = useContext(WishlistContext);
  const [wishFunc, setwishFunc] = useState({});
  const { data, error, isError, isLoading } = useProducts();
  const [loadingProductId, setLoadingProductId] = useState(null);

  if (isLoading) {
    return (
      <div className="loader-overlay">
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <h2>{error}</h2>;
  }

  async function addToCartKobry(id) {
    setLoadingProductId(id);
    let response = await addToCart(id);
    if (response.data.status === "success") {
      setitemNum(itemNum +1)
      toast.success("Product added to your cart successfully");
    } else {
      toast.error("Failed to add");
    }
    setLoadingProductId(null);
  }

  async function addToWishKobry(Id) {
    let res = await addToWish(Id);

    if (res.data?.status === "success") {
      setwishFunc((prev) => ({ ...prev, [Id]: !prev[Id] }));
      setCountWishlist(CountWishlist+1)

      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      toast.error(res.data?.message || "Failed to update wishlist");
    }
  }

  return (
    <>
      <div className="row py-10 ps-72">
        {data?.data?.data.map((product) => (
          <div
            key={product.id}
            className="product w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-2"
          >
            {/* Product Details Link */}
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <div className="p-5 block text-left">
                <img
                  src={product.imageCover}
                  className="w-full h-[220px] object-cover rounded-md"
                  alt=""
                />
                <span className="text-lime-600 mb-0.5 font-sans">
                  {product.category.name}
                </span>
                <h3 className="font-semibold pb-2 text-slate-800">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
              </div>
            </Link>
  
            {/* Price & Rating */}
            <div className="flex justify-between py-4">
              <span>{product.price} EGP</span>
              <i className="fas fa-star text-yellow-400">
                <span className="text-slate-800 font-thin font-sans">
                  {product.ratingsAverage}
                </span>
              </i>
            </div>
  
            {/* Wishlist Button (Moved Outside the Link) */}
            <div className="flex justify-center items-center pb-2">
  <button
    onClick={() =>
      wishFunc[product.id] ||
      targetItems.filter((item) => item.id == product.id) == product.id
        ? removeItem(product.id)
        : addToWishKobry(product.id)
    }
    className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition duration-300 hover:bg-yellow-600 hover:text-white"
  >
    <span className="font-semibold">Add to Wishlist</span>
    <span className="text-2xl">
      {wishFunc[product.id] ||
      targetItems.filter((item) => item.id == product.id) == product.id
        ? "❤️"
        : "🤍"}
    </span>
  </button>
</div>

  
            {/* Add to Cart Button */}
            <button
              onClick={() => addToCartKobry(product.id)}
              className="btn font-semibold text-center p-2 capitalize"
            >
              {loadingProductId === product.id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Add to cart"
              )}
            </button>
          </div>
        ))}
      </div>
  
      {/* Wishlist Button Link */}
      <div className="flex justify-center mt-5 ">
        <Link to="/wishlist" className="bg-gray-200 px-4 py-2 rounded-lg  text-gray-800  transition duration-300 hover:bg-yellow-600 hover:text-white text-center p-2 capitalize w-1/4">
          Go to Wishlist
          <span className="ml-1 bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {CountWishlist}
          </span>
        </Link>
      </div>
    </>
  );
  
}
