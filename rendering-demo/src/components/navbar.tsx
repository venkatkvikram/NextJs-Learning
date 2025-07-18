"use client"
import { useState } from "react";
import NavLinks from "./nav-links";
import NavSearch from "./nav-search";

export default function Navbar() {
    console.log("navbar rendered");
    const [search, setSearch] = useState("");
    return (
        <div>
            <NavLinks />
            <NavSearch />
        </div>
    )
}

//if "use client" is declared in navbar component. Then shouldn't 
//that be the only component running client side.

//When you mark a component with "use client" it doesn't just affect that component
//but affects every child component tree below it. 

//In our case navlinks and nav search become client components
//as well.

//If you convert a high-level component into a client component
//just to add some interactivity you're accidentally making 
//it's entire subchildren run on the client too.

//This means sending more code to the browser and losing the benefits of server components
//That's why we want to push the client components as far down the tree as possible ideally
//making them Leaf components

//We can make it better instead of making Navbar as a client component
// we can keep it as a server component and just convert
//nav search to a client component since it's the only one that actually needs state

//so use client and state to navsearch