import React from 'react';

const DefaultLandingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F1624]">
      <div className="w-full md:w-1/3   p-8 pb-10 flex flex-col space-y-6 items-center text-center gap-6 bg-[#1f3158] shadow-2xl border border-gray-700">
        {/* Logo */}
        <img
          src="/images/logo2.png"
          alt="Company Logo"
          className="w-56 h-auto object-contain"
        />

        {/* "Coming Soon" Title */}
        <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-wide">
          Coming Soon
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-xl font-bold md:text-base leading-relaxed">
          We are working hard to bring you a new and improved website. <br />
          Please check back soon!
        </p>

        {/* Optional Progress Indicator */}
     
      </div>
    </div>
  );
};

export default DefaultLandingPage;
