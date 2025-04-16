import React from 'react';
import CartConatiner from './components/CartContainer';
import CartItem from './components/CartItem';
import CartTotalInfo from './components/CartTotalInfo';
import ProductSelect from './components/ProductSelect';
import CartAddButton from './components/CartAddButton';
import StockStatus from './components/StockStatus';
import CartHeader from './components/CartHeader';
import CartItemContainer from './components/CartItemContainer';

const App: React.FC = () => {
  return (
    <CartConatiner>
      <CartHeader />
      <CartItemContainer>
        <CartItem />
      </CartItemContainer>
      <CartTotalInfo />
      <ProductSelect />
      <CartAddButton />
      <StockStatus />
    </CartConatiner>
  );
};

export default App;
