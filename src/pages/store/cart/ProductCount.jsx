import React, { useState } from 'react';
import S from './style';



const ProductCount = ({product}) => {

  const [count, setCount] = useState(product.productCount)
  const increase = () => {
    setCount(count + 1)
  }

  const decrease = () => {
    setCount(count - 1)
  }

  return (
    <S.productCount>
      <div onClick={decrease}>-</div><span>{count}</span><div onClick={increase}>+</div>
    </S.productCount>
  );
};

export default ProductCount;