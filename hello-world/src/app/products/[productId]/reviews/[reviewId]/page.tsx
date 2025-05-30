
const ProductReviewId = async({params} : {
    params: Promise< { productId: string, reviewId: string}>
}) => {
    const {productId, reviewId} = await params
  return (
    <div>Review for {productId} with review {reviewId}</div>
  )
}

export default ProductReviewId