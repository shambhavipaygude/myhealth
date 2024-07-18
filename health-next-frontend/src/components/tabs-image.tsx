"use client"
import React, { useState } from 'react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yJTIwd2l0aCUyMG1hc2t8ZW58MHx8MHx8fDA%3D',
    title: 'Discover healthcare professionals',
    desc: 'Whether you require a cardiologist, dermatologist, or any other specialist, our platform simplifies the process of finding the right doctor for you.',
  },
  {
    url: 'https://images.unsplash.com/photo-1525770041010-2a1233dd8152?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9iaWxlJTIwY2hhdCUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D',
    title: 'Instant Text Consultation',
    desc: 'Text your doctor for quick and convenient consultations. Stay connected and get the medical advice you need, when you need it.',
  },
  {
    url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D',
    title: 'Submit Medical Reports',
    desc: 'Easily send your medical reports and previous prescriptions to facilitate efficient and comprehensive healthcare management.',
  },
];

const TabsImage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="relative flex max-w-7xl items-start">
      {/* Left side with tabs */}
      <div className="flex flex-col items-start p-4 rounded-lg">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 mb-4 font-semibold bg-white/85 rounded-md max-w-md 
              ${index === activeIndex 
                ? 'bg-white/85 text-white shadow-[0_0_30px_rgba(255,255,255,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black' 
                : 'text-blue-500'
              }`}
          >
            <div className='text-black text-lg mb-3 mt-1'>
              <img src="https://cdn-icons-png.flaticon.com/128/7312/7312623.png" className='max-w-6 ml-auto'></img>
              {image.title}
            </div>
            <div className='text-gray-700 font-normal mb-5'>
              {image.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Right side with image */}
      <div className="relative flex justify-center items-center ">
        <img src={images[activeIndex].url} alt={images[activeIndex].title} className="w-3/4 h-full  object-cover rounded-lg mt-3.5" />
        <div className="w-3/4 h-full inset-0 flex items-center justify-center">
        </div>
      </div>
    </div>
    </div>
  );
};

export default TabsImage;
