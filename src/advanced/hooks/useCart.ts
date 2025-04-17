import { useState } from 'react';
import { Product } from './useProduct';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Cart {
  cartItems: CartItem[];
  selectedId: string | null;
  currentBonusPoints: number;
  currentTotalAmount: number;
  currentItemCount: number;
  discountRate: number;
}

export const useCart = (initialCartState: Cart) => {
  const [cart, setCart] = useState<Cart>(initialCartState);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.cartItems.find(
        (item) => item.id === product.id,
      );

      let updatedItems;
      if (existingItem) {
        updatedItems = prevCart.cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedItems = [
          ...prevCart.cartItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ];
      }

      return {
        ...prevCart,
        cartItems: updatedItems,
        selectedId: product.id,
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      cartItems: prevCart.cartItems.filter((item) => item.id !== productId),
    }));
  };

  const setSelectedId = (productId: string | null) => {
    setCart((prevCart) => ({
      ...prevCart,
      selectedId: productId,
    }));
  };

  const updateCartItemQuantity = (productId: string, change: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.cartItems
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) {
              return null; // Will be filtered out below
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];

      return {
        ...prevCart,
        cartItems: updatedItems,
      };
    });
  };

  return {
    cart,
    addToCart,
    setSelectedId,
    removeFromCart,
    updateCartItemQuantity,
  };
};
