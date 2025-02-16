import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [getRel, setGetRel] = useState([]);
  let { id, category } = useParams();
  let { addToCart } = useContext(CartContext);

  // ✅ Fetch Product Details when `id` changes
  function getProductDetails(productId) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((res) => setProduct(res.data.data))
      .catch((err) => console.error("Error fetching product:", err));
  }

  // ✅ Fetch Related Products when `category` changes
  function getRelatedProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter((p) => p.category.name === category);
        setGetRel(related);
      })
      .catch((err) => console.error("Error fetching related products:", err));
  }

  useEffect(() => {
    if (id) {
      getProductDetails(id); 
    }
    if (category) {
      getRelatedProducts(); 
    }
  }, [id, category]); 

  function handleAddToCart(productId) {
    if (!productId) {
      toast.error(" Invalid product ID");
      return;
    }

    addToCart(productId)
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(" Product added to cart successfully!");
        } else {
          toast.error(" Failed to add product. Try again.");
        }
      })
      .catch(() => toast.error(" Error adding product to cart."));
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 3000,
    autoplay: true,
  };

  return (
    <>
      {product ? (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <Slider {...settings} className="cursor-pointer">
                {product?.images?.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    className="w-full h-[400px] object-cover rounded-lg shadow-md"
                    alt="Product"
                  />
                ))}
              </Slider>
            </div>

            <div className="w-full md:w-2/3 flex flex-col justify-center text-left space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">{product?.title}</h3>
              <p className="text-gray-600 leading-relaxed">{product?.description}</p>

              <div className="flex items-center justify-between w-full border-t pt-4">
                <span className="text-xl font-semibold text-green-600">
                  {product?.price} EGP
                </span>
                <div className="flex items-center">
                  <i className="fas fa-star text-yellow-400 text-lg"></i>
                  <span className="text-gray-700 text-lg font-medium ml-1">
                    {product?.ratingsAverage}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(product.id)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="row mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Products</h2>
            {getRel.length > 0 ? (
              getRel.map((relatedProduct) => (
                <div key={relatedProduct.id} className="md:w-1/2 lg:w-1/4 xl:w-1/6 product">
                  <Link to={`/productdetails/${relatedProduct.id}/${relatedProduct.category.name}`}>
                    <div className="p-5 block text-left">
                      <img src={relatedProduct.imageCover} className="w-full" alt="Related Product" />
                      <span className="text-lime-600 mb-0.5 font-sans">
                        {relatedProduct.category.name}
                      </span>
                      <h3 className="font-semibold pb-2 text-slate-800">
                        {relatedProduct.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="flex justify-between py-4">
                        <span>{relatedProduct.price}EGP</span>
                        <i className="fas fa-star text-yellow-400">
                          <span className="text-slate-800 font-thin font-sans">
                            {relatedProduct.ratingsAverage}
                          </span>
                        </i>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevents navigation when clicking the button
                          handleAddToCart(relatedProduct.id);
                        }}
                        className="btn text-center p-2 capitalize"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No related products found.</div>
            )}
          </div>
        </div>
      ) : (
<div className="loader-overlay">
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  </div>      )}
    </>
  );
}
