import React from 'react';
import heroimg from "../images/image.png";

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-orange-900 bg-opacity-50">
        <img src={heroimg} className="w-full opacity-25 h-full" alt="Hero background" />
      </div>

      {/* Content aligned to the left */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-left text-black px-8 md:px-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Welcome to Pet Paradise
        </h1>
        <p className="text-lg md:text-xl mb-6 text-white">
          Your trusted partner for premium pet boarding services.
        </p>
        <div className="flex space-x-4">
          <a
            href="/book-now"
            className="px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
          >
            Book Now
          </a>
          <a
            href="/learn-more"
            className="px-6 py-3 border bg-slate-200 border-orange-500 text-orange-500 rounded-full hover:bg-white hover:text-black transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
