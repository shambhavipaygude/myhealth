import React from "react";

const Ticker: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="relative max-w-9 overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-block">
        {text.split('').map((char, index) => (
          <span key={index} className="mx-1">
            {char}
          </span>
        ))}
      </div>
      <div className="animate-marquee inline-block">
        {text.split('').map((char, index) => (
          <span key={index} className="mx-1">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
