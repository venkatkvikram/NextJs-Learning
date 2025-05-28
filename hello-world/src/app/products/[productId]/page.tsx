const ProductDetails = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const productId = (await params).productId;

  return <h1>ProductDetails {productId}</h1>;
};

export default ProductDetails;

//1. NextJs treats a folder name in square brackets as dynamic segemnt
//making routes dynamic and flexible
//2.Every page in app router receives route parameters through the PARAMS prop
//3.The type of params is a promise that resolves to an object containing dynamic
//segments as key pairs in our case it's productId which is the name of the folder.
//4. The adavantage about server components are we can use async/await to resolve
//the promise and access the dynamic segment 

//In our case   //code: const productId = (await params).productId;
