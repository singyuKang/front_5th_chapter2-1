import React from 'react';
import { Product } from '../hooks/useProduct';

interface ProductSelectProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const ProductSelect = ({ products, onProductSelect }: ProductSelectProps) => {
  return (
    <select
      id="product-select"
      className="border rounded p-2 mr-2"
      onChange={(e) => {
        const product = products.find(
          (product) => product.id === e.target.value,
        );
        if (!product) return;
        onProductSelect(product);
      }}
    >
      {products.map((product) => (
        <option
          key={product.id}
          value={product.id}
          disabled={product.count === 0}
        >
          {product.name} - {product.price}원
        </option>
      ))}
    </select>
  );
};
export default ProductSelect;
