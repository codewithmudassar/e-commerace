"use client";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newItem) => {
    var cartCopy = [...cartItems];

    const alreadyExitstItem = cartCopy.find(
      (checkItem) => checkItem._id === newItem._id
    );

    if (alreadyExitstItem) {
      cartCopy = cartCopy.map((checkItem) => {
        checkItem._id === newItem._id
          ? {
              ...checkItem,
              quantity: checkItem.quantity + 1,

              totolPrice: (checkItem.quantity + 1) * checkItem.price,
            }
          : checkItem;
      });
    } else {
      cartCopy.push({
        ...newItem,
        quantity: 1,
        totolPrice: newItem.price,
      });
    }

    localStorage.setItem("CartItems", JSON.stringify(cartCopy));

    setCartItems(cartCopy);
  };

  useEffect(() => {
    const cartItems = localStorage.getItem("CartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
