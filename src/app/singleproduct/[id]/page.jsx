"use client";
import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "@/context/CartProvider";

const Page = ({ params }) => {
  const [activeImg, setActiveImg] = useState("");
  const [product, setProduct] = useState(null);
  const [value, setValue] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product?.price);


  const { addToCart } = useContext(CartContext);

  const updateTotalPrice = () => {

    const newTotalPrice = product.price * value;
    setTotalPrice(newTotalPrice);
  };

  const [num, setNum] = useState(1);

  const increment = () => setNum(num + 1);
  const decrement = () => setNum(num > 1 ? num - 1 : 1);
  const id = params.id;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    adaptiveHeight: true,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await res.json();
        setProduct(data.getSingle);
        setActiveImg(data.getSingle.images[0]);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    fetchData();
  }, [id]);

  function createMarkup(desc) {
    return { __html: desc };
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="lg:flex md:flex mb-5 gap-4">
        <div className="md:w-4/12">
          <div className="flex flex-col items-center mt-7 mb-5 mx-5">
            <div className="flex justify-center mb-5">
              <img
                src={activeImg}
                alt="Active item"
                className=" w-9/12 h-72 max-w-md object-cover  shadow-sm shadow-orange-400"
              />
            </div>
            <div className="w-full max-w-md border shadow-inner shadow-orange-300">
              <Slider {...settings}>
                {product.images.map((v, i) => (
                  <div key={i} className="p-2">
                    <img
                      src={v}
                      className=" w-20 h-20 border border-orange-300 rounded-md cursor-pointer"
                      alt={`Carousel item ${i}`}
                      onClick={() => setActiveImg(v)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="mt-28 flex-1">
          <h1 className="text-center mb-5 font-extrabold text-gray-700 text-3xl">
            {product.title}
          </h1>
          <hr />
          <div
            className="text-justify mr-5 indent-10 tracking-wide mt-7 line-clamp-4"
            dangerouslySetInnerHTML={createMarkup(product.desc)}
          />
          <div className="flex justify-between mx-7 mt-24">
            <div className="mt-5 text-orange-400 text-xl">
              RS. {product.price}
            </div>
            <div className="mt-5 text-gray-700 font-bold">
              Stock: {product.stock}
            </div>
          </div>
          {/* <div className="mt-14 ml-14">
            <div className="flex items-center  mt-4">
              <p className="text-orange-500 text-xl mr-4">Quantity:</p>
              <button
                className="border border-solid w-7 h-7 text-gray-700 bg-gray-100 hover:bg-gray-200"
                onClick={decrement}
              >
                -
              </button>
              <p className="mx-4 w-7 text-center">{num}</p>
              <button
                className="border border-solid w-7 h-7 text-gray-700 bg-gray-100 hover:bg-gray-200"
                onClick={increment}
              >
                +
              </button>
            </div>
          </div> */}

          {/* Quantity */}
          <button
            disabled={value === 9}
            onClick={() => {
              if (value < 9) {
                setValue(value + 1);
                updateTotalPrice();
              }
            }}
          >
            +
          </button>
          <h1>{value}</h1>
          <button
            disabled={value === 1}
            onClick={() => {
              if (value > 0) {
                setValue(value - 1);
                updateTotalPrice();
              }
            }}
          >
            -
          </button>

          <div className="mt-24 ml-24 flex gap-10">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="border px-6 sm:px-14 py-2 sm:py-4 font-bold text-white bg-orange-400 hover:bg-orange-500 w-full sm:w-auto">
                Buy Now
              </button>
              <button
                onClick={() => addToCart(product)}
                className="border px-6 sm:px-14 py-2 sm:py-4 font-bold text-white bg-orange-400 hover:bg-orange-500 w-full sm:w-auto"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-justify mr-5 indent-10 tracking-wide mt-7"
        dangerouslySetInnerHTML={createMarkup(product.desc)}
      />
    </div>
  );
};

export default Page;
