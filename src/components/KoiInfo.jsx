import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import useLocation from react-router-dom
import { FaKey, FaPencilAlt, FaSearchPlus } from 'react-icons/fa';  // Import the icons


const KoiInfo = () => {
  return (
    <>
      {/* Main Info Section */} 
      <div className="text-center pt-5">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin text-center leading-tight mb-4">
          How to Get Started and Buy Live Koi Online at F Koi Farm
        </h2>

        <p className="text-lg text-center mb-4">
          Discover the beauty of our world-class koi collection at F Koi Farm’s very first Koi Shop! 
          Whether you're new to koi keeping or an experienced enthusiast, our shop offers a wide selection of handpicked koi straight from Japan. 
          Browse our koi collection and find the perfect addition to your pond, all available for purchase online.
        </p>

        <p className="text-lg text-center mb-6">
          At F Koi Farm, we focus on delivering healthy, high-quality koi fish, carefully raised in pristine conditions. 
          <Link to="/register" className="bg-gradient-to-r from-orange-400 to-orange-700 text-transparent bg-clip-text font-bold">
            Sign Up
          </Link> 
          <span className="mx-2">or</span>
          <Link to="/login" className="bg-gradient-to-r from-orange-400 to-orange-700 text-transparent bg-clip-text font-bold">
            Log In
          </Link> 
          <span>{" "}to access our full range of koi, including exclusive offers for registered members. Start building your dream koi pond with our beautiful selection.</span>
        </p>

        {/* Buttons for Login, Sign Up, View All Koi */}
        <div className="flex justify-around mt-6">
          <div className="flex flex-col items-center">
            <FaKey className="text-6xl text-orange-500 mb-2" /> 
            <Link 
              className="py-2.5 px-5 text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text"
              to="/login"
            >
              Login
            </Link>
          </div>
          
          <div className="flex flex-col items-center">
            <FaPencilAlt className="text-6xl text-orange-500 mb-2" /> 
            <Link 
              className="py-2.5 px-5 text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text"
              to="/register"
            >
              Sign Up
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <FaSearchPlus className="text-6xl text-orange-500 mb-2" /> 
            <Link 
              className="py-2.5 px-5 text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text"
              to="/products"
            >
              View All Koi
            </Link>
          </div>
        </div>
        <div className="my-6">
           <button className="text-orange-600 text-lg font-semibold border-2 border-orange-500 bg-orange-100 py-2 px-6 rounded-lg hover:bg-orange-200 transition-all pt-3 pb-3">
            View New User Instructions
        </button>
        </div>
      </div>
    </>
  );
};

export default KoiInfo;
