import React from 'react';
import CartConatiner from './components/CartContainer';
import CartItem from './components/CartItem';
import CartTotalInfo from './components/CartTotalInfo';
import ProductSelect from './components/ProductSelect';
import CartAddButton from './components/CartAddButton';
import StockStatus from './components/StockStatus';
import CartHeader from './components/CartHeader';
import CartItemContainer from './components/CartItemContainer';
import { Product, useProduct } from './hooks/useProduct';

const App: React.FC = () => {
  const initialProductList = [
    { id: 'p1', name: '상품1', price: 10000, count: 50 },
    { id: 'p2', name: '상품2', price: 20000, count: 30 },
    { id: 'p3', name: '상품3', price: 30000, count: 20 },
    { id: 'p4', name: '상품4', price: 15000, count: 0 },
    { id: 'p5', name: '상품5', price: 25000, count: 10 },
  ];

  const { products } = useProduct(initialProductList);

  const handleAddToCart = (product: Product) => {
    //Product Cart 추가 처리
  };

  return (
    <CartConatiner>
      <CartHeader />
      <CartItemContainer>
        <CartItem />
      </CartItemContainer>
      <CartTotalInfo />
      <ProductSelect products={products} onProductSelect={handleAddToCart} />
      <CartAddButton />
      <StockStatus />
    </CartConatiner>
  );
};

export default App;
