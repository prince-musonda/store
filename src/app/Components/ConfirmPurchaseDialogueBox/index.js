"use client";

import { useState } from "react";
import clsx from "clsx";
import "./style.css";
import { deliveryAddresses } from "./utils";
import useAuthContextProvider from "@/app/hooks/useAuthContextProvider";
import httpAddNewOrder from "@/app/utils/httpAddNewOrder";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/app/utils/Notifications";
import LoadingAnimation from "../LoadingAnimation";

export default function ConfirmPurchaseDialogueBox(props) {
  const { usersAuthToken } = useAuthContextProvider();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactDetail, setContactDetail] = useState("");
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);

  const addressChangeHandler = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const contactDetailChangeHandler = (e) => {
    setContactDetail(e.target.value);
  };

  const hideConfirmPurchaseComponent = () => {
    props.cancelPurchase();
  };

  const makePurchase = async () => {
    // validation
    if (!usersAuthToken) {
      showErrorNotification("please login");
    }
    if (!deliveryAddress) {
      showErrorNotification(
        "Please select the closest location where you can pick the item from "
      );
    }
    if (!contactDetail) {
      showErrorNotification(
        `please provide a phone number on which we can
         contact you on regarding the delivery and your purchase`
      );
    }

    if (contactDetail && usersAuthToken && deliveryAddress) {
      try {
        setShowLoadingAnimation(true);
        const res = await httpAddNewOrder(usersAuthToken, {
          contactDetail,
          deliveryAddress,
          productId: props.productId,
          quantity: props.quantity,
          size: props.size,
        });
        if (res.success == true) {
          // hide the confirm purchase dialogue and just return to cart page
          hideConfirmPurchaseComponent();
          showSuccessNotification(res.message);
        }
        // else if request to make purchase or place order fails
        // due reasons like a product no longer been in stock
        else {
          showErrorNotification(res.message);
          console.log(res.message);
        }
      } catch (e) {
        console.log(e);
        showErrorNotification("failed to place order. Something went wrong!");
      }
    }
    setShowLoadingAnimation(false);
  };

  return (
    <div className="overlay">
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
            defaultValue={deliveryAddress}
            onChange={addressChangeHandler}
          >
            <option></option>
            {deliveryAddresses.map((address) => {
              return (
                <option key={address} value={address}>
                  {address}
                </option>
              );
            })}
          </select>
        </div>

        {/* confirm purchase btn and cancel btn */}
        <div className="mt-10">
          {/* cancel btn */}
          <button
            className="primary-btn mr-10"
            onClick={hideConfirmPurchaseComponent}
          >
            Cancel
          </button>
          {/* loading animation */}
          {showLoadingAnimation && <LoadingAnimation />}
          {/* confirm purchase btn */}
          {!showLoadingAnimation && (
            <button
              className={clsx(
                deliveryAddress && contactDetail ? "primary-btn" : "disabled"
              )}
              disabled={deliveryAddress && contactDetail ? false : true}
              onClick={makePurchase}
            >
              Confirm Purchase
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
