import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Cart = () => {
  const  params  = useParams();

  return (
    <>
    {params.id}
    <br></br>
    {params.price}
    <br></br>
    {params.quantity}
    <br></br>
    {params.name}
    </>
  );
};

export default Cart;
