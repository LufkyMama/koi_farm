import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="relative bg-cover bg-center h-screen ">
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl text-center font-bold  tracking-wide pt-3 " style={{ fontFamily: 'Playfair Display SC, serif' }}>
          F Koi Farm &
        </h1>
        <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl text-center mt-4 tracking-wide ">
          The best Japanese koi for sale online and by phone!
        </h2>
        <div className="flex mt-8 space-x-4">
          <Link to="/shop" className="flex items-center justify-center w-44 h-10 bg-orange-500 rounded-full text-white font-semibold cursor-pointer shadow-[1px_3px_0_0_#e07c24] transition-all gap-2 hover:bg-orange-600 active:transform active:translate-x-1 active:shadow-[0px_1px_0_0_#e07c24]">
            View Koi for Sale
            <svg className="w-3.5 h-auto fill-current" viewBox="0 0 576 512">
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
            </svg>
          </Link>

          <Link to="/register" className="flex items-center justify-center w-44 h-10 bg-orange-500 rounded-full text-white font-semibold cursor-pointer shadow-[1px_3px_0_0_#e07c24] transition-all gap-2 hover:bg-orange-600 active:transform active:translate-x-1 active:shadow-[0px_1px_0_0_#e07c24]">
            Create Account
            <svg className="w-3.5 h-auto fill-current" viewBox="0 0 448 512">
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm89.6 32h-8.7c-21.8 10-45.7 16-70.9 16s-49.1-6-70.9-16h-8.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>
          </Link>
        </div>
        <p className="mt-10 text-lg text-center text-neutral-200 max-w-4xl">
          Please call us at (012)-3445-789 or email us at fkoi@gmail.com
        </p>
      </div>
    </section>
  );
};

export default HeroSection
