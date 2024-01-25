"use client";
import LoadingAnimation from "../LoadingAnimation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import httpAddToCart from "@/app/utils/httpAddToCart";
import useAuthContextProvider from "@/app/hooks/useAuthContextProvider";
import { showErrorNotification } from "@/app/utils/Notifications";
export default function BuyNowButton({ productId }) {
  const router = useRouter();
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const { usersAuthToken } = useAuthContextProvider();

  const goToUsersCartPage = () => {
    router.push("/cart");
  };

  const gotToLoginPage = () => {
    router.push("/login");
  };

  const buyNowHandler = async () => {
    // check user is not logged in
    if (!usersAuthToken) {
      showErrorNotification(
        "You need to login first before you can start purchasing"
      );
      gotToLoginPage();
      return;
    }
    // else if logged in or authenticated
    else {
      setShowLoadingAnimation(true);
      try {
        const res = await httpAddToCart({ productId, usersAuthToken });
        if (res.success == false) {
          showErrorNotification(res.message);
        } else {
          goToUsersCartPage();
        }
      } catch (e) {
        showErrorNotification(e);
        showErrorNotification("sorry, something went wrong.");
      }
    }
    setShowLoadingAnimation(false);
  };

  // ################################################################
  // ###################################################################################
  // ##########################################################################################
  if (showLoadingAnimation) {
    return <LoadingAnimation />;
  } else {
    return (
      <button onClick={buyNowHandler} className="primary-btn whitepace-nowrap">
        Buy Now
      </button>
    );
  }
}
