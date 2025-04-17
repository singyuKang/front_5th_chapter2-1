import React from 'react';

interface CartAddButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const CartAddButton: React.FC<CartAddButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <button
      id="add-to-cart"
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={onClick}
      disabled={disabled}
    >
      추가
    </button>
  );
};

export default CartAddButton;
