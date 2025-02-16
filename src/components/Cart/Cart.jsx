import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { showAddedProductsCart, updateCartCount, removeItem, itemNum, setitemNum } = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);

  async function addedCartKobry() {
    let res = await showAddedProductsCart();
    setCartProducts(res.data.data);
  }

  async function updateCartCountKobry(id, count) {
    setLoadingProductId(id);
    let res = await updateCartCount(id, count);
    
    if (res.data.status === "success") {
      setCartProducts(res.data.data);
      toast.success('Product count updated successfully');
    } else {
      toast.error('Failed to add');
    }
    setLoadingProductId(null);
  }

  async function removeItemKobry(productId) {
    await removeItem(productId);
    setitemNum(itemNum -1)
    addedCartKobry();
   

  }

  useEffect(() => {
    addedCartKobry();
  }, []);

  return (
    <> 
      {cartProducts?.products?.length > 0 ? (
        <> 
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 p-4 rounded-lg shadow-lg text-center">
            Total Price: <span className="inline-block animate-pulse ml-2">${cartProducts?.totalCartPrice?.toFixed(2)}</span>
          </h2>
          
          <div className="relative shadow-lg sm:rounded-lg p-4">
            {cartProducts?.products?.map((product) => (
              <div key={product.product.id} className="flex flex-col md:flex-row items-center justify-between bg-white border-b border-gray-400 p-4 shadow-md rounded-lg mb-4">
                <img src={product.product.imageCover} className="w-20 h-20 object-cover rounded-md" alt={product.product.title} />
                <div className="flex-1 text-center md:text-left md:ml-4">
                  <h3 className="font-semibold text-lg">{product.product.title}</h3>
                  <p className="text-gray-600 font-bold text-md">${product.price}</p>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <button onClick={() => updateCartCountKobry(product.product.id, product.count - 1)}
                    className="p-2 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-green-500 hover:text-white">
                    -
                  </button>
                  <span className='px-4 font-extrabold'>{loadingProductId === product.product.id ? <i className="fas fa-spinner fa-spin"></i> : product.count}</span>
                  <button onClick={() => updateCartCountKobry(product.product.id, product.count + 1)}
                    className="p-2 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-green-500 hover:text-white">
                    +
                  </button>
                </div>
                <span onClick={() => removeItemKobry(product.product.id)}
                  className="text-red-600 cursor-pointer hover:underline mt-2 px-5 md:mt-0">
                  Remove
                </span>
              </div>
            ))}
            <Link to="/checkout"> 
              <button className='w-full md:w-auto bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-800 mt-4'>Checkout</button> 
            </Link>
          </div>
        </>
      ) : (
        <h2 className="text-2xl md:text-3xl font-bold text-gray-600 flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg shadow-md">
          <span className="text-red-500 text-5xl mb-2">🛒</span>
          No data to show
        </h2>
      )}
    </>
  );
}
