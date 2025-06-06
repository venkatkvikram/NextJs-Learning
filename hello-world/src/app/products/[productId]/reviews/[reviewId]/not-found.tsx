"use client"

import { usePathname } from "next/navigation";

const NotFound = () => {
  const pathName = usePathname() //extract route parameters from it
  const productId = pathName.split("/")[2];
  const reviewId = pathName.split("/")[4];
  return (
    <div>
      <h2>Review {reviewId} Not Found for Product {productId} </h2>
    </div>
  );
};

export default NotFound;



