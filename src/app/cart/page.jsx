"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartProvider";
import Link from "next/link";

const ShoppingCart = () => {
  const router = useRouter();
  const [value, setValue] = useState(1);

  const {
    cartItems,
    addToCart,
    clearCart,
    decreaseItemQuantity,
    increaseItemQuantity,
    RemoveSpecificItemFromCart,
  } = useContext(CartContext);
  const cartLength = cartItems.length;

  //   console.log(cartItems)
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
        : item.price;
    return total + itemPrice * item.quantity;
  }, 0);
  console.log(cartItems)

  return (
    <>
      <div className="max-w-[1250px] 2xl:m-auto 2xl:my-12 md:m-5 border rounded-lg p-4 shadow">
        <h2 className="text-slate-700 mt-4 mb-6 text-3xl font-bold">
          Shopping Cart
        </h2>
        {cartLength == 0 ? null : (
          <div className="grid grid-cols-6 justify-center items-center place-content-center border-b border-b-slate-200 pb-4 text-slate-500 text-xs w-full lg:w-[69%]"></div>
        )}
        <div className="flex gap-6 lg:flex-row md:flex-col flex-col items-center justify-center lg:items-start md:items-start">
          <div className="lg:w-[70%] md:w-full ">
            {cartLength == 0 ? (
              <div className="my-2 ml-56 m-auto">
                <img
                  height={200}
                  width={200}
                  alt="empty cart image here"
                  className="w-48 select-none"
                  src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png?f=webp"
                />
                <h1 className="text-slate-600 font-light mb-4">
                  Shoping Cart Empty
                </h1>
                <Link
                  href="/"
                  className="border flex gap-3 w-fit items-center px-5 py-3 rounded-full text-slate-500 hover:text-orange-400 hover:border-orange-300 transition-all"
                >
                  <i className="bx bxs-chevron-left text-sm asideAnimate"></i>{" "}
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                {cartItems.map((v, i) => {
                  return (
                    <div className="grid grid-cols-3 lg:grid-cols-6 items-center lg:justify-center lg:items-center place-content-center border-b border-b-slate-200 md:pb-4 md:my-3">
                      <div className="flex items-center gap-4 col-span-3">
                        <img
                          height={200}
                          width={200}
                          alt="image here"
                          src={v?.images[0]}
                          className="lg:w-24 md:w-32 w-24 h-auto object-cover"
                        />
                        <div className="lg:w-[65%] w-[70%]">
                          <h2 className="line-clamp-1 text-slate-800 font-medium">
                            {v?.title}
                            {v?.stock}
                          </h2>

                          <div className="flex flex-col gap-2 mt-3">
                            <span className="text-xs font-normal text-slate-950">
                              Rs/- {v?.price}
                            </span>
                            <span className="text-xs font-light text-slate-600">
                              {v?.category?.title}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 grid lg:items-end md:mt-4 my-4"></div>
                      <div className="col-span-1 grid lg:items-end md:mt-4 my-4">
                        <div className="px-4 py-1 rounded-full border w-fit">
                          <button
                            className=" text-slate-500 text-sm disabled:border-red-300 disabled:bg-orange-100 disabled:cursor-not-allowed"
                            onClick={() => {
                              decreaseItemQuantity(cartItems[i]);
                            }}
                          >
                            -
                          </button>
                          <span className="px-2  text-slate-600">
                           {cartItems[i]?.quantity}
                            {/* {cartItems[i]?.quantity > v.stock ? cartItems[i]?.quantity === v.stock : cartItems[i]?.quantity} */}
                          </span>
                          <button
                            className="text-slate-500 text-sm disabled:border-red-300 disabled:bg-orange-100 disabled:cursor-not-allowed"
                          
                            onClick={() =>{
                              if(cartItems[i]?.quantity < v.stock){

                                addToCart(v,value);
                              }
                            }
                              }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-span-1 grid lg:items-end md:mt-4 my-4">
                        <button
                          className="lg:px-2 rounded text-slate-500 text-sm hover:text-slate-700"
                          onClick={() => RemoveSpecificItemFromCart(v?._id)}
                        >
                          <i className="bx bx-x text-xl"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            {cartLength <= 0 ? null : (
              <div className="flex items-center mt-5 gap-3 my-2">
                <Link
                  href={"/checkout"}
                  className="disabled:hidden border px-5 py-2 rounded-full text-white font-light bg-orange-400 hover:bg-orange-500 transition-all"
                >
                  Procced to Checkout
                </Link>
                <button
                  onClick={() => {
                    clearCart();
                  }}
                  disabled={cartLength == 0}
                  className="disabled:hidden border px-5 py-2 rounded-full text-slate-500 font-light hover:text-orange-600 transition-all"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
          <div className="md:w-full lg:w-[30%] w-full">
            <div className=" bg-[#eeeeee4c] p-3 border border-gray-50 rounded-lg shadow-sm shadow-gray-300 ">
              <h1 className="text-slate-700 border-black border-b-[1px] pb-3 text-xl mb-8 font-bold">
                Order Summary
              </h1>
              <div className="flex mb-4 pb-4 border-black border-b-[3px]">
                <p className="text-md font-bold text-[#000000] w-2/4"> Name</p>
                <p className="text-md font-bold text-[#000000] w-1/4">
                  {" "}
                  Quantity
                </p>
                <p className="text-md mx-3 font-bold text-[#000000] w-1/4"> price</p>
              </div>
              {cartLength == 0 ? null : (
                <>
                  {cartItems.map((v, i) => {
                    return (
                      <div className=" flex  mb-4 pb-4 border-black border-b-[3px]">
                        <div className="text-md text-[#000000b0] w-2/4 ">
                          {v.title}
                        </div>
                        <div className="text-sm  text-[#000000b0] w-1/4">
                          {v.quantity}
                        </div>
                        <div className="text-sm text-[#000000b0] w-1/4">
                          {v.price}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
              <div className="flex justify-between mb-4 pb-4 ">
                <h1 className="text-sm text-[#000000b0]"> Total</h1>
                <p className="text-sm text-[#000000b0]">{`RS. ${totalPrice.toFixed(
                  2
                )}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
