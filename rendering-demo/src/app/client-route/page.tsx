"use client"
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTheme } from '@/components/theme-provider';
import { clientSideFunction } from '../utils/client-utils';


export default function ClientRoutePage() {
    const theme = useTheme();
    const result = clientSideFunction();
    const settings = {
        dots: true,
      };
      return (
        // <div className="image-slider-container">
        //   <Slider {...settings}>
        //     <div>
        //       <img src="http://picsum.photos/400/200" />
        //     </div>
        //     <div>
        //       <img src="http://picsum.photos/400/200" />
        //     </div>
        //     <div>
        //       <img src="http://picsum.photos/400/200" />
        //     </div>
        //     <div>
        //       <img src="http://picsum.photos/400/200" />
        //     </div>
        //   </Slider>
        // </div>
        <>   
        <h1 style={{color: theme.colors.primary}}>Client Router page </h1>
        <p>{result}</p>
        </>
      );
}

//Even though we are wrapping our application in a client
//component which is a theme provider server components
//further down the tree stay as server components

//Instead of converting a server component to a client component create a seperate client component
//and import it in the server componnet with the children props


