"use client";
import React, { useEffect } from "react";
import { useState } from "react";

const Carousel = ({ children: slides ,
    autoSlide = false, 
    autoSlideInterval = 3000
 }) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(()=>{
    if (!autoSlide) 
        return
    const slideInterval = setInterval(next,autoSlideInterval)
    return ()=> clearInterval(slideInterval)
  },[])

  return (
    <div className="  border overflow-hidden  relative">
      <div
        style={{ transform: `translateX(-${curr*100}%)` }}
        className="flex transition-transform ease-out duration-500"
      >
        {slides}
      </div>
      <div className=" absolute inset-0 flex items-center justify-between p-4 ">
        <button
          onClick={prev}
          className="  w-3 h-3 opacity-0  rounded-full md:opacity-45  sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-11 lg:h-11 shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <i className=" bx bx-chevron-left sm:text-2xl md:text-3xl "></i>
        </button>
        <button
          onClick={next}
          className=" w-3 h-3  opacity-0  rounded-full  md:opacity-45 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-11 lg:h-11 bg-white/80 text-gray-800 hover:bg-white"
        >
          <i className="  bx bx-chevron-right sm:text-2xl md:text-3xl"></i>
        </button>
      </div>
      <div className=" absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
            {slides.map((_,i)=>(
                <div className={` transition-all opacity-0 sm:opacity-45 md:opacity-45  lg:w-3 lg:h-3 sm:w-1 sm-h-1 md:w-2 md:h-2 rounded-full bg-white ${curr === i ? "p-1 sm:p2 "  : "bg-opacity-50 "}`}/>
            ))}
        </div>
      </div>

    </div>
  );
};

export default Carousel;
