"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingAnimation from "../LoadingAnimation";
import httpAddtoCart from "@/app/utils/httpAddToCart";
import useAuthContextProvider from "@/app/hooks/useAuthContextProvider";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/app/utils/Notifications";

export default function AddToCartButton({ productId, productName }) {
  const router = useRouter();
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { usersAuthToken } = useAuthContextProvider();
  const goToLoginPage = () => {
    router.push("/login");
  };
  const addToCartHandler = async () => {
    setShowLoadingAnimation(true);
    // when user isn't authenticated or logged in
    if (!usersAuthToken) {
      showErrorNotification(
        "please Login into your account before adding anything to cart."
      );
      goToLoginPage();
    }
    // when user is authenticated or logged in
    try {
      const res = await httpAddtoCart({
        productId,
        productName,
        usersAuthToken,
      });
      // when successfull added
      if (res.success === true) {
        setIsAddedToCart(true);
        showSuccessNotification(
          `sucessfully added ${productName} to your cart`
        );
      }
      // when not successfull added due to some other reasons
      // like product no longer in stock
      else {
        showErrorNotification(res.message);
      }
    } catch (e) {
      // when something goes wrong
      showErrorNotification(
        `something went wrong. Failed to add ${productName} to your cart`
      );
      showErrorNotification(e);
    }
    setShowLoadingAnimation(false);
  };

  // when making the request to add to cart
  if (showLoadingAnimation) {
    return <LoadingAnimation />;
  }
  // when successfull added to cart
  else if (isAddedToCart) {
    return <p className="text-green-400">Already in cart </p>;
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
