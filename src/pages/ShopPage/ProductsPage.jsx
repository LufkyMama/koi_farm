import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import Button from "../../components/button/Button";
import ShoppingCart from "../../components/ShoppingCart";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "lucide-react";
import ComparisonCart from "../../components/Comparison";
import Pagination from "../../components/Pagination";

const ProductsPage = () => {
  const [koiFishs, setKoiFishs] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [compareItems, setCompareItems] = useState(() => {
    const savedCompare = localStorage.getItem("compareItems");
    return savedCompare ? JSON.parse(savedCompare) : [];
  });
  const [sortOrder, setSortOrder] = useState("normal");
  const [cartOpen, setCartOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = koiFishs.slice(firstPostIndex, lastPostIndex);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const navigate = useNavigate();

  const fetchKoiFish = useCallback(async () => {
    try {
      const endpoint = "/koi/Koi/available";
      const response = await api.get(endpoint);
      let sortedData = response.data;

      if (sortOrder !== "normal") {
        sortedData = sortedData.sort((a, b) => {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        });
      }

      setKoiFishs(sortedData);
    } catch (error) {
      console.error("Error fetching koi fish:", error);
      alert(
        "Failed to fetch koi fish. Please check the console for more details."
      );
    }
  }, [sortOrder]);

  useEffect(() => {
    fetchKoiFish();
  }, [sortOrder, fetchKoiFish]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("compareItems", JSON.stringify(compareItems));
  }, [compareItems]);

  const handleAddToCart = (koiFish) => {
    setCartItems((prevItems) => [...prevItems, koiFish]);
    alert(`${koiFish.name} has been added to cart`);
  };

  const handleRemoveFromCart = (koiFishId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.koiID !== koiFishId)
    );
  };

  const handleCompare = (koiFish) => {
    setCompareItems((prevItems) => {
      if (prevItems.find((item) => item.koiID === koiFish.koiID)) {
        return prevItems.filter((item) => item.koiID !== koiFish.koiID);
      } else if (prevItems.length < 2) {
        return [...prevItems, koiFish];
      }
      return prevItems;
    });
  };

  const handleRemoveFromCompare = (koiFishId) => {
    setCompareItems((prevItems) =>
      prevItems.filter((item) => item.koiID !== koiFishId)
    );
  };

  const handleCompareNow = () => {
    if (compareItems.length === 2) {
      navigate("/products/comparison");
      console.log("Comparing items:", compareItems);
    }
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleNavigateToPayment = (koiFish) => {
    navigate(`/payment/${koiFish.koiID}`, { state: { koiFish } });
  };

  return (
    <div className="bg-orange-100 min-h-screen">
      <div className="container mx-auto px-4 py-7">
        <div className="text-4xl font-bold mb-6 text-center text-gray-800">
          <h1>F Koi Shop</h1>
        </div>

        {/* Sort and Compare */}
        <div className="flex justify-between items-center mb-4 p-4">
          {/* Compare Button on the left */}
          <button
            onClick={toggleCartVisibility}
            className="flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-600 text-white border-none rounded-full px-6 py-3 shadow-lg hover:from-orange-500 hover:to-orange-700 transition duration-300 transform hover:scale-105"
          >
            <span className="mr-2">🔄</span> So sánh ({compareItems.length})
          </button>

          {/* Sort and Cart Buttons on the right */}
          <div className="flex justify-end items-center">
            <div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
              >
                <option value="normal">Price</option>
                <option value="asc">Price: Ascending</option>
                <option value="desc">Price: Descending</option>
              </select>
            </div>
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
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentPosts.map((koiFish) => (
            <div key={koiFish.koiID} className="max-w-xs overflow-hidden">
              <Link to={`/view-details/${koiFish.koiID || koiFish.consignmentKoiID}`}>
                <img
                  src={
                    koiFish.image ??
                    "https://www.kodamakoifarm.com/wp-content/uploads/2024/05/w0503s054-re-260x421.jpg"
                  }
                  alt={koiFish.name}
                  className="w-full h-100 object-cover"
                />
              </Link>
              <div className="p-4">
                <h1 className="text-lg font-semibold">{koiFish.name}</h1>
                <p className="text-sm text-gray-500">#{koiFish.koiID}</p>
                <p className="text-red-500 font-bold mt-2">
                  Price: ${koiFish.price.toFixed(2) || "N/A"}
                </p>

                <div className="mt-4">
                  <p className="text-sm">
                    <strong>Age:</strong> {koiFish.age || "Unknown"}
                  </p>
                  <p className="text-sm">
                    <strong>Sex:</strong> {koiFish.gender || "Unknown"}
                  </p>
                  <p className="text-sm">
                    <strong>Size:</strong> {koiFish.size || "Unknown"}
                  </p>
                  <p className="text-sm">
                    <strong>Color:</strong> {koiFish.color || "Unknown"}
                  </p>
                  <p className="text-red-500 text-sm">
                    <strong>Species:</strong> {koiFish.species || "Unknown"}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4 space-x-2">
                  <button
                    onClick={() => handleAddToCart(koiFish)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300 flex items-center font-medium text-sm"
                  >
                    <ShoppingBagIcon className="mr-1 h-4 w-4" />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => handleNavigateToPayment(koiFish)}
                    className="bg-white text-red-500 border border-red-500 px-3 py-1 rounded-lg hover:bg-red-100 transition duration-300 font-medium text-sm"
                  >
                    Pay Now
                  </button>

                  <button
                    onClick={() => handleCompare(koiFish)}
                    className={`px-3 py-1 rounded-lg font-medium text-sm transition duration-300 ${
                      compareItems.find((item) => item.koiID === koiFish.koiID)
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-400 text-white hover:bg-blue-500"
                    }`}
                  >
                    {compareItems.find((item) => item.koiID === koiFish.koiID)
                      ? "Remove from Compare"
                      : "Compare"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isCartVisible && (
          <ComparisonCart
            compareItems={compareItems}
            onRemove={handleRemoveFromCompare}
            onCompare={handleCompareNow}
            onClose={toggleCartVisibility}
          />
        )}

        {/* Shopping Cart Dialog */}
        <ShoppingCart
          open={cartOpen}
          setOpen={setCartOpen}
          products={cartItems}
          onRemove={handleRemoveFromCart}
        />
      </div>

      <Pagination
        totalPosts={koiFishs.length}
        postPerPage={postsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default ProductsPage;
