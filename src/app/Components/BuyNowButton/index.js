"use client";

export default function BuyNowButton({ productId }) {
  const buyNowHandler = () => {
    // do something
  };
  return (
    <button onClick={buyNowHandler} className="primary-btn whitepace-nowrap">
      Buy Now
    </button>
  );
}
