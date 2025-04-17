import React from 'react';
import { CartItem } from '../hooks/useCart';

interface CartItemProps {
  cartItem: CartItem;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <span>
        {cartItem.name} - {cartItem.price}원 x {cartItem.quantity}
      </span>
      <div>
        <button
          className={`quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1`}
          data-product-id={`${cartItem.id}`}
          data-change="-1"
          onClick={() => {}}
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id={`${cartItem.id}`}
          data-change="1"
          onClick={() => {
            // 수량 증가 로직
          }}
        >
          +
        </button>
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          data-product-id={`${cartItem.id}`}
          onClick={() => {
            // 삭제 로직
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CartItem;
