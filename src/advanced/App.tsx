import React from 'react';
import CartConatiner from './components/CartContainer';

const App: React.FC = () => {
  return (
    <CartConatiner>
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      <div id="cart-items" />
      <div id="cart-total" className="text-xl font-bold my-4" />
      <select id="product-select" className="border rounded p-2 mr-2" />
      <button id="add-to-cart" className="bg-blue-500 text-white px-4 py-2 rounded">
        추가
      </button>
      <div id="stock-status" className="text-sm text-gray-500 mt-2" />
    </CartConatiner>
  );
};

export default App;
