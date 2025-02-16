/** @format */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Allorders() {
  const [orders, setOrders] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [id, setId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setId(decoded.id);
        console.log("Decoded JWT:", decoded.id);
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }, []);

  async function getAllorders() {
    if (!id) return;

    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setOrders(response.data);
      console.log("Orders Data:", response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    if (id) {
      getAllorders();
    }
  }, [id]); 

  const toggleItemExpand = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId], 
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">All Orders</h1>
      {orders.length > 0 ? (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <h2 className="text-lg font-semibold mb-2">
                Order ID: {order._id}
              </h2>
              <p className=" text-white font-extrabold p-1 my-1  bg-red-400">
                Total Price: {order.totalOrderPrice} EGP
              </p>
              <p className="text-white font-bold pt-1 my-1 bg-green-600">
                Payment status: {order.isPaid ? "Paid" : "Not paid yet"}
              </p>
              <p className="text-white font-bold pt-1 my-1 bg-amber-600">
                Delivery status:{" "}
                {order.isDelivered ? "Delivered" : "Order on its way"}
              </p>
              <p className="text-black font-bold">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>

              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className={`mt-4 border-t pt-2 cursor-pointer transition-all duration-500 ease-in-out ${
                    expandedItems[item._id]
                      ? "bg-gray-100 shadow-lg"
                      : "bg-white"
                  }`}
                  onClick={() => toggleItemExpand(item._id)}
                >
                  <h2 className="text-lg font-semibold flex justify-between p-2">
                    {item.product.title}
                    <span className="text-red-500">
                      {expandedItems[item._id] ? "▲" : "▼"}
                    </span>
                  </h2>

                  <div
  className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center gap-2 ${
    expandedItems[item._id]
      ? "max-h-screen opacity-100 p-2"
      : "max-h-0 opacity-0"
  }`}
>
  {/* Image on the Left */}
  <img
    src={item.product.imageCover}
    alt={item.product.title}
    className="w-34 h-34 object-cover rounded-md"
  />

  {/* Details EXACTLY next to the image */}
  <div className="flex flex-col mx-5">
    <p className="text-gray-600 font-semibold">Seller: {item.product.brand.name}</p>
    <p className="text-gray-600 font-semibold">Price: {item.price} EGP</p>
    <p className="text-gray-600 font-semibold">Quantity: {item.count}</p>
    <i className="fas fa-star text-yellow-400">
      <span className="text-slate-800 font-thin font-sans">
        {item.product.ratingsAverage}
      </span>
    </i>
  </div>
</div>

                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No orders found.</p>
      )}
    </div>
  );
}
