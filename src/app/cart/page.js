"use client";

import Link from "next/link";
import CartItemCard from "../Components/Cart_item_Card";
import useAuthContextProvider from "../hooks/useAuthContextProvider";

import { useEffect, useState } from "react";
import httpGetUsersCart from "../utils/httpGetUsersChat";
import LoadingAnimation2 from "../Components/LoadingAnimation2";

export default function CartPage() {
  const { usersAuthToken } = useAuthContextProvider();
  console.log(usersAuthToken);
  const [usersCart, setUsersCart] = useState([]);
  const [showErrorMesaage, setShowErrorMessage] = useState(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);

  const getUsersCart = async () => {
    console.log("getting users chart");
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
                key={cartItem.productId}
              />
            );
          })
        )}
      </main>
    );
  }
}
