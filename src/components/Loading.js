import React from 'react';
import img from '../assets/images/loading_spinner.gif'

let Loading = ({ loading }) => (
  loading ?
  <div style={{ textAlign: 'center' }}>
    <img src={img} alt='loading' />
    <h1>Loading...</h1>
  </div> :
  null
);

export default Loading;