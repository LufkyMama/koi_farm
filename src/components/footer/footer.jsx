import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <>
      <div className="bg-[#FFA07A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Us Section */}
            <div>
              <h3 className="text-lg font-bold text-orange-600 mb-4" style={{ fontFamily: 'sans-serif' }}>Kodama Koi Farm</h3>
              <p className="text-black">
                F Koi farm is a new Koi Farm at Sai Gon, it provied variety of koi type . Our location is Khu Cong Nghe Cao
              </p>
              <p className="text-black mt-2">P.O. Box 893086, Mililani HI 96789</p>
              <p className="text-black">Hours of Operation: Mon-Fri, 7:00 a.m. - 3:00 p.m. HST</p>
            </div>

            {/* Contact Information Section */}
            <div>
              <h3 className="text-lg font-bold text-orange-600 mb-4" style={{ fontFamily: 'sans-serif' }}>Contact Us</h3>
              <p className="text-black flex items-center">
                <FaPhoneAlt className="mr-2" /> +1 (833) Koi Love (1-833-564-5683)
              </p>
              <p className="text-black flex items-center mt-2">
                <FaEnvelope className="mr-2" /> info@fkoi.com
              </p>
              <p className="text-black">Help: info@fkoi.com</p>
            </div>

            {/* Account Information Section */}
            <div>
              <h3 className="text-lg font-bold text-orange-600 mb-4" style={{ fontFamily: 'sans-serif' }}>Account Information</h3>
              <ul className="text-black">
                <li><a href="/">Welcome!</a></li>
                <li><a href="/account">My Account</a></li>
                <li><a href="/account/reset-password">Reset Password</a></li>
                <li><a href="/account/lost-password">Lost Password</a></li>
                <li><a href="/account/edit">Edit Information</a></li>
              </ul>
            </div>

            {/* For Koi Lovers Section */}
            <div>
              <h3 className="text-lg font-bold text-orange-600 mb-4" style={{ fontFamily: 'sans-serif' }}>For Koi Lovers!</h3>
              <ul className="text-black">
                <li><a href="/koi/nishikigoi">What is a Nishikigoi?</a></li>
                <li><a href="/koi/cost">How Much Do Koi Fish Cost?</a></li>
                <li><a href="/koi/pond-types">Types of Pond Fish</a></li>
                <li><a href="/koi/benefits-salt">Benefits of Salt in Koi Pond</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t bg-black border-orange-300  text-center text-white">
        <p>© 2024 FKoi Farm. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="https://facebook.com" className="text-white hover:text-orange-800">
            <FaFacebook size={24} />
          </a>
          <a href="https://instagram.com" className="text-white hover:text-orange-800">
            <FaInstagram size={24} />
          </a>
          <a href="https://twitter.com" className="text-white hover:text-orange-800">
            <FaTwitter size={24} />
          </a>
        </div>
      </div>

    </>

  );
}

export default Footer;
