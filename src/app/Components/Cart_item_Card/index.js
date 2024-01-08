import Image from "next/image";
import { useState } from "react";
import "./styles.css";

// to use the CartItemCard, jsut provide the following props
// 1) imagesUrl
// 2) productName
// 3) price
// 4) quantity
export default function CartItemCard(props) {
  const [quantity, setQuantity] = useState(1);
  function increaseQty() {
    // increase quantity
    setQuantity(quantity + 1);
  }
  function reduceQty() {
    // reduce quantity
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  return (
    <div className="flex justify-between gap-4 align-center bg-white py-2 px-4 mb-4 shadow-lg">
      {/* product image */}
      <Image
        src={props.imagesUrl[0]}
        alt={props.productName}
        width={100}
        height={100}
      />
      <section className="md:flex md:flex-1 md:justify-evenly">
        {/* product details */}
        <div>
          <h3>{props.productName}</h3>
          {/* price per quantity */}
          <h3>K{props.price} per Quantity</h3>
          {/* total cost*/}
          <h3 className="font-bold">total cost: K{props.price * quantity}</h3>
        </div>

        {/* action button: delete button, increase and reduce quantity btn, and buy now button */}
        <div className="flex flex-col">
          {/* quantity control buttons */}
          <div>
            <span>Quantity: </span>
            <button className="quantity-btn" onClick={increaseQty}>
              +
            </button>
            <span className="quantity-text">{quantity}</span>
            <button className="quantity-btn" onClick={reduceQty}>
              -
            </button>
          </div>
          {/* delete item from cart item and buy right now buttons*/}
          <div className="mt-2">
            <button className="primary-btn mr-2">Remove</button>
            <button className="primary-btn">Buy Now</button>
          </div>
        </div>
      </section>
    </div>
  );
}
