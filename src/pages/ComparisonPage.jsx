import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "../components/ShoppingCart"; // Import your ShoppingCart component
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "lucide-react";
const ComparisonPage = () => {
  const [compareItems, setCompareItems] = useState(() => {
    const savedCompare = localStorage.getItem("compareItems");
    return savedCompare ? JSON.parse(savedCompare) : [];
  });
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
 

  useEffect(() => {
    localStorage.setItem("compareItems", JSON.stringify(compareItems));
  }, [compareItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveFromCompare = (koiFishId) => {
    setCompareItems((prevItems) => prevItems.filter(item => item.koiID !== koiFishId));
  };

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };
  const handleCompareNow = () => {
    if (compareItems.length === 2) {
      console.log("Comparing items:", compareItems);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white w-full max-w-6xl p-8 rounded-lg shadow-lg relative">

      <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition duration-300"
            >
              <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        
        
        <div className="flex justify-end mb-6 grid grid-cols-3 gap-4">
            <h2 className="text-2xl font-bold mb-6">Product Comparison</h2>
          {compareItems.map((item) => (
            <div key={item.koiID} className="flex flex-col items-center">
              <img 
                src={item.image || "https://www.kodamakoifarm.com/wp-content/uploads/2024/05/w0503s054-re-260x421.jpg"} 
                alt={item.name} 
                className="w-48 h-65 object-cover mb-2" 
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <button onClick={() => handleAddToCart(item)} className="text-blue-500 mt-2">Add to Cart</button>
              <button onClick={() => handleRemoveFromCompare(item.koiID)} className="text-red-500 mt-2">Remove</button>
            </div>
          ))}
        </div>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Attribute</th>
              {compareItems.map((item) => (
                <th key={item.koiID} className="border px-4 py-2">{item.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
           
            {[
              { label: "Price", key: "price" },
              { label: "Gender", key: "gender" },
              { label: "Age", key: "age" },
              { label: "Size", key: "size" },
              { label: "Color", key: "color" },
              { label: "Daily Feed Amount", key: "dailyFeedAmount" },
              { label: "Personality", key: "personality" },
              { label: "Origin", key: "origin" },
              { label: "Selection Rate", key: "selectionRate" },
              { label: "Species", key: "species" },
              { label: "Add-On", key: "addOn" },
            ].map((attribute) => (
              <tr key={attribute.key}>
                <td className="border px-4 py-2 font-semibold">{attribute.label}</td>
                {compareItems.map((item) => (
                  <td key={item.koiID} className="border px-4 py-2">
                    {item[attribute.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="flex justify-end mt-4">
          <button onClick={() => setCompareItems([])} className="text-blue-500">Clear All</button>
        </div>
      </div>
      <ShoppingCart
        open={cartOpen}
        setOpen={setCartOpen}
        products={cartItems}
        onRemove={(id) => setCartItems(cartItems.filter(item => item.koiID !== id))}
      />
    </div>
  );
};

export default ComparisonPage;
