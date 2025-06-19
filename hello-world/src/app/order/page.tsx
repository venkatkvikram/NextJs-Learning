"use client";

import { useRouter } from "next/router";

const OrderProduct = () => {
  const router = useRouter();

  const handleClick = () => {
    console.log("Placing the order");
    router.push("/");
  };
  return (
    <>
      <h1>OrderProduct</h1>
      <button onClick={handleClick}>Place order</button>
    </>
  );
};

export default OrderProduct;
