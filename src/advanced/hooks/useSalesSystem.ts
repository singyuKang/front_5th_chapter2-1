import { useEffect, useRef } from 'react';
import { CONSTANTS } from '../constants/constants.ts';
import ERROR_MESSAGES from '../constants/errorMessages.ts';
import { Product } from './useProduct.ts';

interface SaleSystemParams {
  products: Product[];
  applyDiscount: (productId: string, discountRate: number) => void;
  updateCartPrices: (productId: string, newPrice: number) => void;
}

export const useSalesSystem = ({
  products,
  applyDiscount,
  updateCartPrices,
}: SaleSystemParams) => {
  const flashSaleTimerRef = useRef<number | null>(null);
  const flashSaleIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    setupFlashSale();

    return () => {
      if (flashSaleTimerRef.current) clearTimeout(flashSaleTimerRef.current);
      if (flashSaleIntervalRef.current)
        clearInterval(flashSaleIntervalRef.current);
    };
  }, []);

  function setupFlashSale() {
    const delay = Math.random() * CONSTANTS.FLASH_SALE.MAX_DELAY;

    flashSaleTimerRef.current = setTimeout(() => {
      flashSaleIntervalRef.current = setInterval(() => {
        try {
          runFlashSale();
        } catch (error) {
          console.error(ERROR_MESSAGES.SALE_SYSTEM.FLASH_SALE_ERROR, error);
        }
      }, CONSTANTS.FLASH_SALE.INTERVAL);
    }, delay);
  }

  function runFlashSale() {
    if (!products || products.length === 0) {
      console.warn(ERROR_MESSAGES.SALE_SYSTEM.NO_PRODUCTS);
      return;
    }

    const luckyItemIndex = Math.floor(Math.random() * products.length);
    const luckyItem = products[luckyItemIndex];

    if (Math.random() < CONSTANTS.FLASH_SALE.CHANCE && luckyItem.quantity > 0) {
      const discountRate = CONSTANTS.FLASH_SALE.DISCOUNT_RATE;
      const newPrice = Math.round(luckyItem.price * discountRate);

      // 상품 가격 업데이트
      applyDiscount(luckyItem.id, discountRate);

      // 장바구니에 있는 동일 상품의 가격도 업데이트
      updateCartPrices(luckyItem.id, newPrice);

      alert(`번개세일! ${luckyItem.name} 이(가) 20% 할인 중입니다!`);
    }
  }

  return { runFlashSale };
};
// function setupSuggestions() {
//   const delay = Math.random() * CONSTANTS.SUGGESTION.MAX_DELAY;

//   setTimeout(() => {
//     setInterval(() => {
//       try {
//         runSuggestion();
//       } catch (error) {
//         console.error(ERROR_MESSAGES.SALE_SYSTEM.SUGGESTION_ERROR, error);
//       }
//     }, CONSTANTS.SUGGESTION.INTERVAL);
//   }, delay);
// }

// function runSuggestion() {
//   if (!state.selected || !state.productList || state.productList.length === 0) {
//     console.warn(ERROR_MESSAGES.SALE_SYSTEM.NO_PRODUCTS);
//     return;
//   }

//   const suggest = state.productList.find(
//     (item) => item.id !== state.selected && item.count > 0,
//   );
//   if (suggest) {
//     alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
//     suggest.price = Math.round(
//       suggest.price * CONSTANTS.SUGGESTION.DISCOUNT_RATE,
//     );
//     updateSelOpts();
//   }
// }
