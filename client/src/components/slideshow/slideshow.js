import React from 'react';
import './slideshow.css';
import Carousel from 'react-bootstrap/Carousel'
import room from './room.jpg';
import room2 from './room2.jpg';
import room3 from './room3.jpg';


function slideshow() {
  return (
     
    <Carousel className="carousel">
  <Carousel.Item>
    <img
      className="d-block w-100 slideshowimg"
      src={room}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Furniture experts</h3>
      <p>We do everything to make our client happy</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 slideshowimg"
      src={room2}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Furniture experts</h3>
      <p>We do everything to make our client happy</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 slideshowimg"
      src={room3}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Furniture experts</h3>
      <p>We do everything to make our client happy</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

  );
}

export default slideshow;