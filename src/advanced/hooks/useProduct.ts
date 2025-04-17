import { useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const useProduct = (initialProductList: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProductList);

  const updateProductQuantity = (id: string, quantityChange: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity + quantityChange,
          };
        }
        return product;
      }),
    );
  };

  return {
    products,
    updateProductQuantity,
  };
};
