import React from "react";
import KoiImage1 from "../assets/Koi4.png"; 
import KoiImage2 from "../assets/koi2.png"; 
import KoiImage3 from "../assets/Koi3.png"; 
import KoiImage4 from "../assets/koi1.jpg"; 
import Testinominals from '../components/Testinominals';
function LandingPage() {
    return (
        <>
            {/* First Section */}
            <section className="flex flex-col md:flex-row items-center justify-between bg-white py-32 px-16 md:px-32">
                <div className="md:w-1/2 max-w-lg space-y-8 text-center md:text-left md:mr-12">
                    <h1 className="text-8xl font-extrabold text-gray-900 leading-tight">
                        Welcome <br /> to FKoi
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed tracking-wide mt-4">
                        Discover the beauty and serenity of Koi fish, the captivating centerpiece of our aquatic oasis.
                    </p>
                    <button className="bg-[#E15A1D] text-white text-lg font-semibold px-10 py-3 rounded-full hover:bg-[#D1491E] transition duration-200 mt-6 shadow-md">
                        Explore Now
                    </button>
                </div>
                <div className="md:w-1/2 flex justify-center mt-10 md:mt-0 md:pl-12">
                    <img
                        src={KoiImage1}
                        alt="Koi Fish"
                        className="w-[450px] h-auto object-cover"
                    />
                </div>
            </section>

            {/* Second Section */}
            <section className="flex flex-col md:flex-row items-center justify-between bg-white py-32 px-16 md:px-64">
                <div className="md:w-1/2 max-w-lg space-y-8 text-center md:text-left">
                    <h2 className="text-6xl font-bold text-gray-900 leading-tight">
                        Unlock the Wonders of Koi
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed tracking-wide mt-4">
                        From vibrant colors to graceful movements, our Koi embody the essence of nature’s artistry.
                    </p>
                    <button className="bg-[#E15A1D] text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-[#D1491E] transition duration-200 mt-4 shadow-md">
                        Learn More
                    </button>
                </div>
                <div className="md:w-1/2 flex justify-end mt-10 md:mt-0 relative">
                    <div className="absolute w-[300px] h-[300px] bg-orange-200 rounded-full -top-10 -right-10 opacity-50"></div>
                    <img
                        src={KoiImage2}
                        alt="Red Koi Fish Art"
                        className="w-[450px] h-auto object-cover rounded-tl-[50px] rounded-bl-[50px] shadow-lg"
                    />
                </div>
            </section>

            {/* Third Section */}
            <section className="flex flex-col md:flex-row items-center justify-between bg-white py-32 px-16 md:px-32">
                <div className="md:w-1/2 flex justify-start mt-10 md:mt-0 relative">
                    <div className="absolute w-[300px] h-[300px] bg-orange-200 rounded-full -top-10 -left-10 opacity-50"></div>
                    <img
                        src={KoiImage3}
                        alt="White Koi Fish Art"
                        className="w-[450px] h-auto object-cover "
                    />
                </div>
                <div className="md:w-1/2 max-w-lg space-y-8 text-center md:text-left">
                    <h2 className="text-6xl font-bold text-gray-900 leading-tight">
                        Unveil the Allure of Koi
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed tracking-wide mt-4">
                        Immerse yourself in the serene elegance of our Koi pond.
                    </p>
                    <button className="bg-[#E15A1D] text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-[#D1491E] transition duration-200 mt-4 shadow-md">
                        Learn More
                    </button>
                </div>
            </section>
            
            {/* Fourth Section */}
            <section className="bg-white py-20 px-8 md:px-32">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-gray-900">Nurture Your Passion</h2>
                    <p className="text-xl text-gray-600 mt-4">
                        Whether you're a seasoned Koi enthusiast or just beginning your journey, our wealth of knowledge and expertise is here to guide you
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <img
                        src={KoiImage4}
                        alt="Koi Fish 1"
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                    <img
                        src={KoiImage4}
                        alt="Koi Fish 2"
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                    <img
                        src={KoiImage4}
                        alt="Koi Fish 3"
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                    <img
                        src={KoiImage4}
                        alt="Koi Fish 4"
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>
            </section>

            {/*Feedback sections*/}
            <section className="bg-white py-20 px-8 md:px-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900">What People Are Saying About Us</h2>
                    <p className="text-gray-600 mt-4">Here's what our customers have to say about their experiences.</p>
                </div>
                <Testinominals />
            </section>
        </>
    );
}

export default LandingPage;
