import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import ProductDetail from '../../components/ProductDetail';

const DetailProduct = () => {
  const { id } = useParams(); 
  
  return (
    <div>
      <ProductDetail id={id} />
    </div>
  );
};

export default DetailProduct;
