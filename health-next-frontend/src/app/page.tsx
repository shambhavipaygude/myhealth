import React from "react";
import Navbar from "@/components/navbar";
import Carousel from "@/components/carousel";
import Ticker from "@/components/ticker";
import TabsImage from "@/components/tabs-image";
import Footer from "@/components/footer";
import AccordionFAQ from "@/components/accordian";

export default function GridBackgroundDemo() {
  return (
    <div>
    <div className="h-full w-full dark:bg-customwhite bg-black dark:bg-grid-black/[0.2] bg-grid-customwhite/[0.2] relative flex flex-col items-center justify-center font-sans">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-customwhite bg-customblue [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] rounded-lg"></div>
      <div className="relative z-10 text-center  items-center">
        <div className="sticky  mx-auto max-w-4xl rounded-md mt-6 top-0 z-20 bg-black">
          <Navbar />
        </div>
        <div className="text-white text-7xl mt-16">
          Promote a better self with <br /> a single click
        </div>
        <div className="mx-auto text-lg mt-10 max-w-3xl text-center" style={{color:'grey', alignSelf:"center"}}>
          Explore top-tier medical experts and find your  <br /> ideal healthcare provider.
          
          Simplifying consultations.
        </div>
        <div className="max-w-lg mx-auto text-center flex justify-center items-center text-white rounded-full mt-16">
          <Carousel />
        </div>
      
      <div>
        <div className="font-mono flex justify-center mb-12 mt-32" style={{color:"lightblue"}}>
          <img src='https://cdn-icons-png.flaticon.com/128/3945/3945107.png' className="max-w-6 mr-3"></img>
          Features
        </div>
        <div className=" flex justify-center items-center ml-16">
            <TabsImage />
        </div>
        <div className="font-mono flex justify-center mb-24 mt-12" style={{color:"lightblue"}}>
          <img src='https://cdn-icons-png.flaticon.com/128/3945/3945107.png' className="max-w-6 mr-3"></img>
          FAQ
        </div>
        <div className="mb-20"><AccordionFAQ/></div>
      </div>
    </div>
    
    </div>
    <div><Footer/></div>
    
    </div>
  );
}
