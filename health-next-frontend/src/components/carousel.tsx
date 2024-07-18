"use client"
import React, { useState, useEffect } from 'react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yJTIwcGF0aWVudHxlbnwwfHwwfHx8MA%3D%3D',
    text: 'Consult one of the topdoctors available for an expert diagnosis.'
  },
  {
    url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yJTIweHJheXxlbnwwfHwwfHx8MA%3D%3D',
    text: 'Send your medical reports to a your specialist for a thorough evaluation.'
  },
  {
    url: 'https://images.unsplash.com/photo-1519336305162-4b6ed6b6fc83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzaW5nJTIwbW9iaWxlfGVufDB8fDB8fHww',
    text: 'Receive expert consultations from anywhere in the world. Just tap and send your details.'
  },
  {
    url: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
    text: 'Get personalized diet plans from a dietitian and stay healthy.'
  },
  {
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yJTIwbGFwdG9wfGVufDB8fDB8fHww',
    text: 'Professional consultations are now effortless and convenient.'
  }
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="flex justify-center">
      <div className="relative w-full overflow-hidden rounded-lg">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="relative min-w-full">
              <img src={image.url} alt={`Slide ${index + 1}`} className="w-full h-auto rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-light p-10 bg-black bg-opacity-50">
                {image.text}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handlePrevClick}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600"
        >
          &#8249;
        </button>
        <button
          onClick={handleNextClick}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600"
        >
          &#8250;
        </button>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
