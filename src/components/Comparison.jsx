import React from "react";

const ComparisonCart = ({ compareItems, onRemove, onCompare, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-6">Comparison Cart</h2>
        <div className="grid grid-cols-2 gap-4">
          {compareItems.map((item) => (
            <div key={item.koiID} className="p-4 border rounded flex flex-col items-center">
              <img src={item.image || "https://www.kodamakoifarm.com/wp-content/uploads/2024/05/w0503s054-re-260x421.jpg"}  alt={item.name} className="w-32 h-65 object-cover mb-2" />
              <p className="text-center">{item.name}</p>
              <button onClick={() => onRemove(item.koiID)} className="text-red-500 mt-2">Remove</button>
            </div>
          ))}
          {compareItems.length < 2 && (
            <div className="p-4 border rounded flex flex-col items-center justify-center">
              <span className="text-gray-500">Add more products</span>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={onCompare}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${compareItems.length < 2 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={compareItems.length < 2}
          >
            Compare Now
          </button>
          <button onClick={() => compareItems.forEach(item => onRemove(item.koiID))} className="text-blue-500">Clear All</button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCart;
