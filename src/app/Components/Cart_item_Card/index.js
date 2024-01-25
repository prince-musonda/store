import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import "./styles.css";

// to use the CartItemCard, jsut provide the following props
// 1) image
// 2) productName
// 3) price
// 4) quantity
// 5) id
export default function CartItemCard(props) {
  const [quantity, setQuantity] = useState(1);

  const [disableButton, setDisableButton] = useState(
    quantity < 1 ? true : false
  );

  const increaseQty = () => {
    // increase quantity
    setQuantity(+quantity + 1);
  };
  const reduceQty = () => {
    // reduce quantity
    if (quantity > 1) {
      setQuantity(+quantity - 1);
    }
  };

  const onChangeHandler = (e) => {
    if (
      isNaN(e.target.value) ||
      e.target.value.trim() == "" ||
      e.target.value == "0"
    ) {
      setQuantity(e.target.value);
      setDisableButton(true);
    } else {
      setQuantity(e.target.value);
      setDisableButton(false);
    }
  };

  const removeFromCart = () => {};

  const buyNow = () => {};

  return (
    <div className="flex  flex-col lg:flex-row md:flex-row justify-between gap-4 items-center  bg-white py-2 px-4 mb-4 shadow-lg">
      {/* product image */}
      <Image
        src={props.image}
        alt={props.productName}
        width={200}
        height={200}
      />
      <section className="md:flex md:flex-1 md:justify-between gap-2">
        {/* product details */}
        <div>
          <h3>{props.productName}</h3>
          {/* price per quantity */}
          <h3>K{props.price} per Quantity</h3>
          {/* total cost*/}
          <h3 className="font-bold">total cost: K{props.price * quantity}</h3>
        </div>

        {/* action buttons: delete button, increase and reduce quantity btn, and buy now button */}
        <div className="flex flex-col">
          {/* quantity control section */}
          <div className="flex">
            <span>Quantity: </span>
            <button className="quantity-btn" onClick={reduceQty}>
              <Image
                src="/left-arrow.svg"
                width={22}
                height={22}
                alt="left allow"
              />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={onChangeHandler}
              min="1"
              className="quantity-input"
            />
            <button className="quantity-btn" onClick={increaseQty}>
              <Image
                src="/right-arrow.svg"
                width={30}
                height={30}
                alt="right allow"
              />
            </button>
          </div>
          {/* delete item from cart item and buy right now buttons*/}
          <div className="mt-2">
            <button className="primary-btn mr-2">Remove</button>
            <button
              className={clsx(disableButton ? "disabled" : "primary-btn")}
              disabled={disableButton}
            >
              Buy Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
