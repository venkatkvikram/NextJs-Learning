import { notFound } from "next/navigation";

const ProductReviewId = async({params} : {
    params: Promise< { productId: string, reviewId: string}>
}) => {
    const {productId, reviewId} = await params;
    if(parseInt(reviewId) > 1000 ) {
      notFound();
    }
  return (
    <div>Review for {productId} with review {reviewId}</div>
  )
}

export default ProductReviewId