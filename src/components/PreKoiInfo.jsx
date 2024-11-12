import React from 'react';

const PreKoiInfoLayout = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 ">     
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center font-semibold mb-6 text-white ">
          3 Secrets for Buying Koi Fish, from the F Koi 
        </h2>

        <div className="relative w-full max-w-lg h-64 bg-gray-200 rounded-md overflow-hidden">
          <iframe
            className="w-full h-full"
            src=""  
            allowFullScreen
            title="F Koi Video"
          ></iframe>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-8 border border-dashed border-orange-500">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center font-semibold mb-6">
          Sign Up For Our Website to Receive 10% Off Koi Food Coupon
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Stay up-to-date with current price, promotions, new blog posts, and updates from the F Koi Farm team.
        </p>
        <p className="text-sm text-gray-600">
        "<span className="text-red-500">*</span>"{" "}Indicates required fields
        </p>
        <form>
          <div className="mb-4 mt-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
              Name<span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <input
                type="text"
                id="first-name"
                placeholder="First"
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                id="last-name"
                placeholder="Last"
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default PreKoiInfoLayout;
