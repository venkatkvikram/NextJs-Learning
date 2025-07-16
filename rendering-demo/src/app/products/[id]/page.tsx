// export async function generateStaticParams() {
//     return [{id: "1"}, {id: "2"}, {id: "3"}]
// }


export default async function ProductDetailsPage({params} : {params: Promise<{id: string}>}) {
    const {id} = await params;
return (
    <h1>
        Product {id} details rendered at {new Date().toLocaleTimeString()}
    </h1>
)
} 


//in  the product details page lets add the generate static params function that returns an array 
//of objects , each object represents a route we want to pre-render with the object 
// key corresponding to our routes Dynamic segment

//when you run npm run build you can see the product 1,2,3 are pre-rendered
//  You can see them as SSG - prerendered as static HTML (uses generateStaticParams)
// 
