"use client";

import Link from "next/link";
import CartItemCard from "../Components/Cart_item_Card";
import useAuthContextProvider from "../hooks/useAuthContextProvider";

import { useEffect, useState } from "react";
import httpGetUsersCart from "../utils/httpGetUsersChat";
import LoadingAnimation2 from "../Components/LoadingAnimation2";
import httpRemoveItemFromCart from "../utils/httpRemoveFromCart";
import { showErrorNotification } from "../utils/Notifications";

export default function CartPage() {
  const { usersAuthToken } = useAuthContextProvider();
  const [usersCart, setUsersCart] = useState([]);
  const [showErrorMesaage, setShowErrorMessage] = useState(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);

  const getUsersCart = async () => {
    setShowLoadingAnimation(true);
    if (usersAuthToken) {
      try {
        const res = await httpGetUsersCart(usersAuthToken);
        const productsInCart = res.data.products;
        console.log(res);
        setUsersCart(productsInCart || []);
      } catch (e) {
        console.error(e);
        setShowErrorMessage(true);
      }
    }
    setShowLoadingAnimation(false);
  };

  const removeItemFromCart = async (productId) => {
    try {
      const res = await httpRemoveItemFromCart(usersAuthToken, productId);
      if (res.success == true) {
        // update usersCart
        const newCart = usersCart.filter(
          (cartItem) => cartItem.productId != productId
        );
        setUsersCart(newCart);
      } else {
        showErrorNotification("failed to remove the item from your cart");
      }
    } catch (e) {
      // In cases where the app fails to make a request to the server
      showErrorNotification("something went wrong");
    }
  };

  useEffect(() => {
    getUsersCart();
  }, [usersAuthToken]);

  // when user is not logged in
  if (!usersAuthToken) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <p>Oops! it seems like you are not logged in.</p>
        <p>
          <Link href="/login" className="primary-btn">
            Log in
          </Link>{" "}
          to view your cart
        </p>
      </div>
    );
  }
  // if an error occurs while trying to get user's cart
  else if (showErrorMesaage) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <p>Oops! Network connection Issues!!!</p>
      </div>
    );
  }

  // when user is logged in and there is no error
  else if (usersAuthToken) {
    return (
      <main>
        {showLoadingAnimation && <LoadingAnimation2 />}
        <h2 className="text-xl font-bold text-gray-400">Your Shopping Cart</h2>
        {usersCart.length == 0 ? (
          <p className="h-[85vh] border-1 flex justify-center items-center text-xl font-bold text-gray-700">
            Your Cart is empty
          </p>
        ) : (
          usersCart.map((cartItem) => {
            return (
              <CartItemCard
                productName={cartItem.productName}
                image={cartItem.image}
                price={cartItem.price}
                onRemoveHandler={removeItemFromCart}
                key={cartItem.productId}
                productId={cartItem.productId}
              />
            );
          })
        )}
      </main>
    );
  }
}
