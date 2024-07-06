"use client"
import React from 'react';
import Slider from 'react-slick';
import { Rating } from 'primereact/rating';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Famous = () => {
  const settings = {
    infinite: true,
    arrows: false,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    pauseOnHover: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  const Data = [
    {
      rating: 5,
      name: 'Hp Laptop',
      desgnation: 'hp 13 genration laptop',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB3fAyqqrF7V90yrOgyn_FrxVSvumE1W_7mw&s',
      revs: 'I recently bought a laptop from this e-commerce store, and it was fantastic! The product matched the description perfectly, and the delivery was incredibly fast. I highly recommend this site',
    },
    {
      rating: 5,
      name: ' Mouse',
      desgnation: 'Red dragon gaming mouse',
      img: 'https://redragonshop.com/cdn/shop/files/LegendChromaM990-RGBGamingMouse_2.png?v=1684908549',
      revs: 'The quality of the products on this e-commerce platform is outstanding. I\'ve made multiple purchases, and each time, the items exceeded my expectations. Great value for money',
    },
    {
      rating: 5,
      name: 'Keyboard',
      desgnation: 'Gaming keyboard',
      img: 'https://www.livemint.com/lm-img/img/2023/09/12/600x338/wired_keyboards_under_rs_1000_1694510459430_1694510467578.jpg',
      revs: 'Seamless shopping, user-friendly website. Top-notch customer service. Reliable e-commerce destination.',
    },
    {
      rating: 5,
      desgnation: 'Gaming Cpu',
      name: 'Cpu',
      img: 'https://gladiatorpc.co.uk//assets/img/configurator/72971Image1.webp',
      revs: 'Loyal customer for years. Extensive product range, competitive prices. Quick delivery, hassle-free returns.',
    },
    {
      rating: 5,
      desgnation: 'Speaker',
      name: 'Audionic Speaker',
      img: 'https://audionic.co/cdn/shop/files/audionic-home-theaters-default-title-classic-1-plus-33845799420060.png?v=1693980053',
      revs: 'Impressed with unique products. Easy navigation, informative customer reviews. Go-to online shopping destination.',
    },
  ];

  return (
    <div id="review" className="max-w-[1250px] m-auto">
      <Slider {...settings}>
        {Data.map((v, i) => (
          <div key={i} className="py-12 px-5 md:px-0">
            <div className="flex md:flex-row flex-col bg-white globalShadow md:shadow-none px-2 md:px-4 py-4 md:py-8 md:p-0 rounded-lg md:rounded-none overflow-hidden">
              <div className="w-full relative z-50 flex flex-row md:flex-col justify-between md:justify-center bg-white px-2 md:px-4 pr-2 md:pr-12 rounded-lg shadow-none md:shadow-lg hover:shadow-2xl transition-all">
                <img
                  src={"https://www.seekpng.com/png/detail/477-4777879_quotes-double-quotes-icon-png.png"}
                  alt="Quote Image Here"
                  className="absolute -bottom-12 md:bottom-[40%] left-1/4 md:left-1 -z-10 opacity-[0.025] w-full"
                />
                <div className="md:mb-3 mb-2">
                  <h2 className="font-semibold text-xl text-slate-800 mb-1">
                    {v.name}
                  </h2>
                  <span className="text-xs text-gray-500 border-b py-2 w-fit">
                    {v.desgnation}
                  </span>
                </div>
                <div>
                  <Rating
                    disabled
                    value={v.rating}
                    cancel={false}
                    className="text-orange-400 mt-1"
                  />
                </div>
              </div>
              <div className="relative top-0 left-0 md:-left-12 flex items-center flex-row z-50 mt-4 md:mt-0 px-2 md:px-0 gap-3 md:gap-0">
                <img
                  alt={v.name}
                  className="h-14 w-14 md:w-44 md:h-44 object-cover md:rounded-lg rounded-full md:mb-2"
                  src={v.img}
                />
                <span className="w-[90%] md:w-full text-gray-500 text-xs pl-0 md:pl-3 md:line-clamp-3 line-clamp-2">
                  {v.revs}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Famous;
