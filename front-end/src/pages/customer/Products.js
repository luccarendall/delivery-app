import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import requestAPI from '../../utils/RequestAPI';

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const goodHTTPResponse = 200;
      const { status, data } = await requestAPI('GET', 'products');
      if (status === goodHTTPResponse) {
        setProducts(data);
      }
    };
    getProducts();
  });

  return (
    <div>
      <NavBar />
      {
        products && products.map((product) => (
          <ProductCard key={ product.id } product={ product } />
        ))
      }
    </div>
  );
}
