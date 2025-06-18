import { Counter } from "./Counter"



export const metadata = {
    title: "Counter"
}


const CounterPage = () => {
  return <Counter />
}

export default CounterPage





//OLD VERSION

// "use client"

// import { useState } from "react"


// export const metadata = {
//     title: "Counter"
// }

// //the above meta data doesn't work as the folder is marked under "use client"

// const CounterPage = () => {
//     const [counter, setCounter] = useState(0)
//   return (
//     <div>
//         <p>Count: {counter}</p>
//         <button onClick={() => setCounter(counter+1)}>Increment</button>
//     </div>
//   )
// }

// export default CounterPage