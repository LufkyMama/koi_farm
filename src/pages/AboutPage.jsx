import React from 'react';
import aboutBg from '../assets/about_bg.jpg';
import fish from '../assets/koi1.jpg'; // Replace with your actual koi image path
import FeedBackCard from '../components/feedBack/FeedBack';

function AboutPage() {
  return (
    <div className="relative">
      {/* Background Section */}
      <div className="relative">
        <img
          src={aboutBg}
          alt="Family History"
          className="w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
          <h1 className="text-white text-5xl font-semibold mb-4" style={{ fontFamily: 'Playfair Display SC, serif' }}>
            About Our Family History
          </h1>
        </div>
      </div>

      {/* First Content Section */}
      <div className="container mx-auto pt-16 pb-16 px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-10 bg-white py-10">
          {/* Left side content */}
          <div className="w-full lg:w-2/3">
            <p className="text-lg mb-4" style={{ fontFamily: 'Georgia, serif', fontSize: '18px', lineHeight: '1.8' }}>
              Our journey into the world of koi began many years ago, inspired by a passion for these elegant creatures and a commitment to excellence. From humble beginnings, our family-run farm has grown to become a leading name in the koi industry, providing top-quality koi fish to enthusiasts around the globe.
            </p>

            <p className="text-lg mb-4" style={{ fontFamily: 'Georgia, serif', fontSize: '18px', lineHeight: '1.8' }}>
              We specialize in breeding and raising Nishikigoi, also known as Japanese Koi, renowned for their vivid colors and intricate patterns. Each fish we raise embodies the dedication and expertise passed down through generations of koi breeders.
            </p>

            <p className="text-lg mb-4" style={{ fontFamily: 'Georgia, serif', fontSize: '18px', lineHeight: '1.8' }}>
              Whether you're a hobbyist or a professional, our koi bring unmatched beauty and joy to ponds everywhere. We take pride in every koi we send to its new home, knowing it will provide a lifetime of happiness to its new owner.
            </p>
          </div>

          {/* Right side content with YouTube embed */}
          <div className="w-full lg:w-1/3 flex justify-center items-center">
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden', width: '100%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/TLccnKIMggA"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Second Content Section */}
      <div className="container mx-auto pt-5 pb-16 px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="flex flex-col lg:flex-row items-start lg:space-x-10 bg-white py-10">
          {/* Left side content */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: 'Playfair Display , serif' }}>
              Raised with precision and care, delivering unparalleled quality.
            </h2>
            <p className="text-lg mb-4" style={{ fontFamily: 'Georgia, serif', fontSize: '18px', lineHeight: '1.8' }}>
              We are committed to raising high-quality koi fish that exceed expectations. Each koi is raised under controlled conditions, ensuring they grow with the best health and vibrancy.
            </p>

            <p className="text-lg mb-4" style={{ fontFamily: 'Georgia, serif', fontSize: '18px', lineHeight: '1.8' }}>
              Our koi fish thrive in an environment designed to mimic their natural habitat, providing them with the ideal conditions to flourish. With each generation, we refine our techniques to produce koi that stand out for their unique patterns and colors.
            </p>

            <p className="text-lg mb-4 font-semibold" >
              Our koi offer a mesmerizing display of beauty, with vibrant colors and intricate designs that captivate the eye.
            </p>

            <h3 className="text-3xl font-semibold mb-4" style={{ fontFamily: 'Playfair Display , serif' }}>What makes our koi special?</h3>
            <p className="text-lg mb-4" style={{ fontFamily: 'Georgia, serif', fontSize: '18px', lineHeight: '1.8' }}>
              Our koi are not just fish; they are living works of art. Carefully bred for their stunning patterns and colors, each koi is a unique masterpiece. Our selective breeding process ensures that only the most exceptional koi are available for your pond.
            </p>

            <button className="button-74 py-2 px-4 rounded mt-4">
              Discover More About Our Koi
            </button>
          </div>

          {/* Right side content with image */}
          <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
            <img
              src={fish}  // Use an actual image here instead of lucide-react icon
              alt="Beautiful Koi"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      <FeedBackCard />
    </div>
  );
}

export default AboutPage;
