import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Button from '@material-ui/core/Button';

export default function ButtonDetail(props){

  return(
    <Button>
      {props.logo}  {props.text}
    </Button>
  )
}
