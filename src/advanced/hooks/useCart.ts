import { useState } from 'react';
import { Product } from './useProduct';
import { useEffect } from 'react';
import { CONSTANTS } from '../constants/constants';

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

  useEffect(() => {
    calculateCart();
  }, [cart.cartItems]);

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

  const calculateCart = () => {
    setCart((prevCart) => {
      let totalItemCount = 0;
      let subTotal = 0;
      let discountedTotal = 0;

      prevCart.cartItems.forEach((item) => {
        totalItemCount += item.quantity;
        const itemTotal = item.price * item.quantity;
        subTotal += itemTotal;

        let discount = 0;
        if (item.quantity >= CONSTANTS.CART.ITEM_DISCOUNT_THRESHOLD) {
          discount = CONSTANTS.DISCOUNT_TABLE[item.id] || 0;
        }
        discountedTotal += itemTotal * (1 - discount);
      });

      let finalAmount = discountedTotal;
      let discountRate = (subTotal - discountedTotal) / subTotal || 0;

      if (totalItemCount >= CONSTANTS.CART.BULK_DISCOUNT_ITEM_COUNT) {
        const bulkDiscountAmt = subTotal * CONSTANTS.CART.BULK_DISCOUNT_RATE;
        const itemDiscountAmt = subTotal - discountedTotal;

        if (bulkDiscountAmt > itemDiscountAmt) {
          finalAmount = subTotal * (1 - CONSTANTS.CART.BULK_DISCOUNT_RATE);
          discountRate = CONSTANTS.CART.BULK_DISCOUNT_RATE;
        }
      }

      const isTuesday = new Date().getDay() === 2;
      if (isTuesday) {
        finalAmount *= CONSTANTS.FRIDAY_SALE.DISCOUNT_RATE;
        discountRate = Math.max(
          discountRate,
          1 - CONSTANTS.FRIDAY_SALE.DISCOUNT_RATE,
        );
      }

      const bonusPoints = Math.floor(
        finalAmount / CONSTANTS.POINTS.EARNING_UNIT,
      );

      return {
        ...prevCart,
        currentItemCount: totalItemCount,
        currentTotalAmount: finalAmount,
        currentBonusPoints: bonusPoints,
        discountRate,
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
