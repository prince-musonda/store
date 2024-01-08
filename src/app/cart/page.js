"use client";

import CartItemCard from "../Components/Cart_item_Card";
import { cartList } from "./utils";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [usersCart, setUsersCart] = useState();
  useEffect(() => {
    // check usersCart
  }, []);
  return (
    <main>
      <h2 className="">Your Shopping Cart</h2>
      {console.log(cartList)}
      {cartList.map((cartItem) => {
        return (
          <CartItemCard
            productName={cartItem.name}
            imagesUrl={cartItem.imagesUrl}
            price={cartItem.price}
          />
        );
      })}
    </main>
  );
}
