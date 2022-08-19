import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Loader() {
  return (
    <ThreeCircles
      color="red"
      outerCircleColor="yellow"
      middleCircleColor="grey"
      innerCircleColor="blue"
      style={{ textAlign: 'center' }}
    />
  );
}
