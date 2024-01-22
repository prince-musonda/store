"use client";

import { useState } from "react";
import LoadingAnimation from "../LoadingAnimation";

export default function AddToCartButton({ productId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const addToCartHandler = () => {
    setIsProcessing(true);
    // do something
  };

  // when making the request to add to cart
  if (isProcessing) {
    return <LoadingAnimation />;
  }
  // when successfull added to cart
  else if (isAddedToCart) {
    return <p className="text-green-400">Already in Cart</p>;
  }
  // when not yet added to cart and is has not yet made
  // request to had to cart. Just show the clickable button for adding
  // to cart
  else {
    return (
      <button
        className="primary-btn whitepace-nowrap"
        onClick={addToCartHandler}
      >
        Add to Cart
      </button>
    );
  }
}
