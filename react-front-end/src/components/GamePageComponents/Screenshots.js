import React, {useEffect, useState} from 'react';
import { Carousel } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';

export default function Screenshots(props) {
  
  console.log("SCREENSHOTS comPONENT", props.screenies)

    return props.screenies.map((image) => (
      <Carousel.Item>
        <img
          className="slideshow-image"
          src={image}
        />
      </Carousel.Item>
  ));
}