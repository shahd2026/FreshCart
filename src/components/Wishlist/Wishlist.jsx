import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Wishlist() {
  const { getLoggedWish, wishlistItems, removeItem, CountWishlist, setCountWishlist } = useContext(WishlistContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function fetchWishlist() {
      let res = await getLoggedWish();
      setWishlist(res?.data?.data || []);
    }
    fetchWishlist();
  }, []);

  async function removeItemKobry(id) {
    try {
      await removeItem(id);
      setWishlist((prev) => prev.filter((item) => item.id !== id));
      setCountWishlist(CountWishlist-1)
  
      // Simple toast success message
      toast.success("Item removed from wishlist ✅");
    } catch (error) {
      toast.error("Failed to remove item ❌");
    }
  }

  return (
    <div className="row py-10 ps-72">
      {wishlist.length === 0 ? (
        <h2 className="text-center text-gray-600 w-full">Your wishlist is empty 💔</h2>
      ) : (
        wishlist.map((product) => (
          <div key={product.id} className="product w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-2">
            <div className="p-5 block text-left">
              <img src={product.imageCover} className="w-full h-[220px] object-cover rounded-md" alt={product.title} />
              <span className="text-lime-600 mb-0.5 font-sans">{product.category.name}</span>
              <h3 className="font-semibold pb-2 text-slate-800">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
              <div className="flex justify-between py-4">
                <span>{product.price} EGP</span>
                <i className="fas fa-star text-yellow-400">
                  <span className="text-slate-800 font-thin font-sans">{product.ratingsAverage}</span>
                </i>
              </div>
              <div>
                <button
                  onClick={() => removeItemKobry(product.id)}
                  className="text-red-600 hover:underline mt-2 px-5 md:mt-0 transition-opacity duration-300 hover:opacity-75"
                >
                  Remove ❌
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
