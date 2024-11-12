import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";

const ProductsPage = () => {
  const [koiFishs, setKoiFishs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("normal");
  const [gender, setGender] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [species, setSpecies] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const navigate = useNavigate();
  
  const getStatusLabel ={
    0: "Available",
    1: "In Order",
    2: "Sold"
  }
  const fetchKoiFish = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = "/koi/Koi/Filter";
      const params = new URLSearchParams();

      if (searchQuery) {
        params.append("name", searchQuery);
      }
      if (gender) {
        params.append("gender", gender);
      }
      if (minAge) {
        params.append("minAge", minAge);
      }
      if (maxAge) {
        params.append("maxAge", maxAge);
      }
      if (size) {
        params.append("size", size);
      }
      if (color) {
        params.append("color", color);
      }
      if (minPrice) {
        params.append("minPrice", minPrice);
      }
      if (maxPrice) {
        params.append("maxPrice", maxPrice);
      }
      if (species) {
        params.append("species", species);
      }

      const response = await api.get(`${endpoint}?${params.toString()}`);
      let sortedData = response.data;

      // Sort by koiID in descending order
      sortedData = sortedData.sort((a, b) => b.koiID - a.koiID);

      if (sortOrder !== "normal") {
        sortedData = sortedData.sort((a, b) => {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        });
      }

      setKoiFishs(sortedData);
    } catch (error) {
      console.error("Error fetching koi fish:", error);
      alert("Failed to fetch koi fish.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, sortOrder, gender, minAge, maxAge, size, color, minPrice, maxPrice, species]);

  useEffect(() => {
    fetchKoiFish();
  }, [fetchKoiFish]);

  const handleDeleteProduct = async (koiID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/koi/Koi/${koiID}`);
      alert("Product deleted successfully!");
      setKoiFishs(koiFishs.filter((koiFish) => koiFish.koiID !== koiID));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Koi Fish</h1>

      {/* Create Koi Button */}
      <div className="mb-4 text-center">
        <button
          onClick={() => navigate("/admin/manageKoi/createKoi")}
          className="bg-green-500 text-white rounded px-4 py-2"
        >
          Create Koi
        </button>
      </div>

      {/* Filter Button */}
      <div className="mb-4 text-center">
        <button
          onClick={() => setFilterVisible(!filterVisible)}
          className={`bg-orange-500 text-white rounded px-4 py-2 ${filterVisible ? "bg-orange-600" : ""}`}
        >
          {filterVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter Inputs */}
      {filterVisible && (
        <div className="mb-4">
          <div>
            <label className="font-bold">Search by color:</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Colors</option>
              <option value="Red">Red</option>
              <option value="Black">Black</option>
              <option value="Orange">Orange</option>
              <option value="White">White</option>
              <option value="Blue">Blue</option>
              <option value="Yellow">Yellow</option>
            </select>
          </div>

          <div>
            <label className="font-bold">Search by gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="font-bold">Search by Age:</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Min"
              />
              <input
                type="number"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Max"
              />
            </div>
          </div>

          <div>
            <label className="font-bold">Search by Price ($):</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Min"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Max"
              />
            </div>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="mb-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="normal">Sort by</option>
          <option value="asc">Price: Ascending</option>
          <option value="desc">Price: Descending</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Koi ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Gender</th>
                <th className="py-2 px-4 border">Color</th>
                <th className="py-2 px-4 border">Size (cm)</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {koiFishs.map((koiFish) => (
                <tr key={koiFish.koiID} className="text-center border-b">
                  <td className="py-2 px-4 border">
                    <Link to={`/view-details/${koiFish.koiID}`}>
                      <img
                        src={koiFish.image ?? "https://www.kodamakoifarm.com/wp-content/uploads/2024/05/w0503s3v1.png"}
                        alt={koiFish.name}
                        className="w-20 h-20 object-cover mx-auto"
                      />
                    </Link>
                  </td>
                  <td className="py-2 px-4 border">{koiFish.koiID}</td>
                  <td className="py-2 px-4 border">{koiFish.name}</td>
                  <td className="py-2 px-4 border">{koiFish.gender}</td>
                  <td className="py-2 px-4 border">{koiFish.color}</td>
                  <td className="py-2 px-4 border">{koiFish.size}</td>
                  <td className="py-2 px-4 border">{getStatusLabel[koiFish.status]}</td>
                  <td className="py-2 px-4 border">${koiFish.price}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDeleteProduct(koiFish.koiID)}
                      className="bg-red-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/admin/manageKoi/updateKoi/${koiFish.koiID}`)}
                      className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
