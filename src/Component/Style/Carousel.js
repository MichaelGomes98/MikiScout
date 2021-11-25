import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function DetailVehicule(props){

  return(
    <Carousel autoPlay interval="2000" transitionTime="1000" infiniteLoop>
        <div>
            <img src="https://picsum.photos/700/400?img=1" />
            <p className="legend">My Classic Still 1</p>
        </div>
        <div>
            <img src="https://picsum.photos/700/400?img=2" />
            <p className="legend">My Classic Still 2</p>
        </div>
        <div>
            <img src="https://picsum.photos/700/400?img=3" />
            <p className="legend">My Classic Still 3</p>
        </div>
    </Carousel>
  )
}
