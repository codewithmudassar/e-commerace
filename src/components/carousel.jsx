"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const Carousel = ({ images }) => {
    

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div id="carouselDarkVariant" className="relative" data-te-carousel-init data-te-ride="carousel">
      {/* Carousel indicators */}
      <div className="absolute inset-x-0 bottom-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0" data-te-carousel-indicators>
        {images.map((_, index) => (
          <button
            key={index}
            data-te-target="#carouselDarkVariant"
            data-te-slide-to={index}
            className={`mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] ${
              activeIndex === index ? 'opacity-100' : 'opacity-50'
            } transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none`}
            aria-current={activeIndex === index}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Carousel items */}
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative float-left ${index === activeIndex ? 'block' : '-mr-[100%] hidden'} w-full !transform-none  transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none`}
            data-te-carousel-fade
            data-te-carousel-item
            data-te-carousel-active={activeIndex === index}
          >
            <img
              src={image.url}
              className="block w-full md:h-screen"
            //   alt={image.alt || `Slide ${index + 1}`}
            />
            <div className="absolute  inset-x-[15%] md:bottom-24 bottom-5  py-5 text-center  md:block">
                <Link className=' inline-block bg-orange-400 px-2 rounded-xl' href={"/category"}>
                <div className='flex items-center'>
              <div className="text-lg font-bold drop-shadow-md shadow-orange-50 text-white">{image.label}</div>
                <i className='bx bx-right-arrow-alt text-xl text-white'></i>
                </div>

                </Link>
                
            </div>
          </div>
        ))}
      </div>

      {/* Carousel controls - prev item */}
      <button
        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        onClick={handlePrev}
      >
        <span className="inline-block h-8 w-8 dark:grayscale">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
      </button>
      {/* Carousel controls - next item */}
      <button
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        onClick={handleNext}
      >
        <span className="inline-block h-8 w-8 dark:grayscale">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
