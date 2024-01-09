"use client";

export default function AddToCartButton({ productId }) {
  const addToCartHandler = () => {
    // do something
  };

  return (
    <button className="primary-btn whitepace-nowrap" onClick={addToCartHandler}>
      Add to Cart
    </button>
  );
}
