"use client";

import { useState } from "react";
import clsx from "clsx";
import "./style.css";
import { deliveryAddresses } from "./utils";

export default function ConfirmPurchaseDialogueBox(props) {
  const [deliveryAdress, setDeliveryAdress] = useState("");
  const [contactDetail, setContactDetail] = useState("");

  const addressChangeHandler = (e) => {
    setDeliveryAdress(e.target.value);
  };

  const contactDetailChangeHandler = (e) => {
    setContactDetail(e.target.value);
  };

  const cancelPurchaseHandler = () => {
    props.cancelPurchase();
  };

  return (
    <div className="dialogue">
      <h1 className="text-blue-700 text-2xl">Confirm purchase</h1>
      <p className="mb-5 text-gray-800 text-xl">
        Are you sure you want to place an order for the following item?
      </p>
      <p>
        Name of Product:{" "}
        <span className="font-bold text-lg">{props.productName}</span>
      </p>
      <p>
        Price per item: K
        <span className="font-bold text-lg">{props.price}</span>
      </p>
      <p>
        quantity:
        <span className="font-bold text-lg">{props.quantity}</span>{" "}
      </p>
      {props.size && (
        <p>
          type or size:
          <span className="font-bold text-lg">{props.size}</span>{" "}
        </p>
      )}

      <p>
        total price: k
        <span className="font-bold text-lg">
          {+props.price * +props.quantity}
        </span>
      </p>

      {/* contact details */}
      <div>
        <p className="text-blue-700 text-xl mb-3">
          What phone number should we contact you on regarding the purchase?
        </p>
        <input
          type="tel"
          name="contactDetails"
          className="contact-details"
          placeholder="e.g +26097000002"
          onChange={contactDetailChangeHandler}
        />
      </div>

      {/* location to delivery the item to */}
      <div className="mt-5">
        <p className="text-blue-700 text-xl mb-3">
          What is the closest location you can pick this item from?
        </p>
        <select
          className="location"
          name="location"
          defaultValue={deliveryAdress}
          onChange={addressChangeHandler}
        >
          <option></option>
          {deliveryAddresses.map((address) => {
            return <option value={address}>{address}</option>;
          })}
        </select>
      </div>

      {/* confirm purchase btn and cancel btn */}
      <div className="mt-10">
        <button className="primary-btn mr-10" onClick={cancelPurchaseHandler}>
          Cancel
        </button>
        <button
          className={clsx(
            deliveryAdress && contactDetail ? "primary-btn" : "disabled"
          )}
          disabled={deliveryAddresses ? false : true}
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
}
