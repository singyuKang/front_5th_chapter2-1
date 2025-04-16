import { CONSTANTS } from './\bconstants/constant.js';
import ERROR_MESSAGES from './\bconstants/errorMessages.js';
import createEl from './ utils/createEl.js';
import { attachEventListener } from './eventManager.js';
import { state, initializeState } from './state.js';
import { createUI, elements } from './ui/element.js';
import { renderBonusPoints, updateSelOpts, updateStockInfo } from './ui/render.js';

//할인 정보
function initializeSaleSystem() {
  setupFlashSale();
  setupSuggestions();
}

function setupFlashSale() {
  const delay = Math.random() * CONSTANTS.FLASH_SALE.MAX_DELAY;

  setTimeout(() => {
    setInterval(() => {
      try {
        runFlashSale();
      } catch (error) {
        console.error(ERROR_MESSAGES.SALE_SYSTEM.FLASH_SALE_ERROR, error);
      }
    }, CONSTANTS.FLASH_SALE.INTERVAL);
  }, delay);
}

function runFlashSale() {
  if (!state.productList || state.productList.length === 0) {
    console.warn(ERROR_MESSAGES.SALE_SYSTEM.NO_PRODUCTS);
    return;
  }
  const luckyItem = state.productList[Math.floor(Math.random() * state.productList.length)];
  if (Math.random() < CONSTANTS.FLASH_SALE.CHANCE && luckyItem.count > 0) {
    luckyItem.price = Math.round(luckyItem.price * CONSTANTS.SUGGESTION.DISCOUNT_RATE);
    alert(`번개세일! ' ${luckyItem.name} 이(가) 20% 할인 중입니다!`);
    updateSelOpts();
  }
}

function setupSuggestions() {
  const delay = Math.random() * CONSTANTS.SUGGESTION.MAX_DELAY;

  setTimeout(() => {
    setInterval(() => {
      try {
        runSuggestion();
      } catch (error) {
        console.error(ERROR_MESSAGES.SALE_SYSTEM.SUGGESTION_ERROR, error);
      }
    }, CONSTANTS.SUGGESTION.INTERVAL);
  }, delay);
}

function runSuggestion() {
  if (!state.selected || !state.productList || state.productList.length === 0) {
    console.warn(ERROR_MESSAGES.SALE_SYSTEM.NO_PRODUCTS);
    return;
  }

  const suggest = state.productList.find((item) => item.id !== state.selected && item.count > 0);
  if (suggest) {
    alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
    suggest.price = Math.round(suggest.price * CONSTANTS.SUGGESTION.DISCOUNT_RATE);
    updateSelOpts();
  }
}

function calculateCartItem() {
  state.currentTotalAmount = 0;
  state.currentItemCount = 0;
  const cartItems = elements.CartContainer.children;
  let subTotal = 0;

  //장바구니에 담겨있는 요소 확인후 갯수와 값 계산
  for (let i = 0; i < cartItems.length; i++) {
    const itemEl = cartItems[i];
    const product = findProductById(itemEl.id);
    const quantity = parseInt(itemEl.querySelector('span').textContent.split('x ')[1]);

    const { itemTotal, discountedTotal, quantity: count } = calculateItemTotal(product, quantity);

    state.currentItemCount += count;
    subTotal += itemTotal;
    state.currentTotalAmount += discountedTotal;
  }

  //일반 할인 처리
  let bulkResult = applyBulkDiscount(subTotal, state.currentTotalAmount);
  let finalAmount = bulkResult.finalAmount;
  let discountRate = bulkResult.discountRate;

  //화요일 할인 처리
  let tuesdayResult = applyTuesdayDiscount(finalAmount, discountRate);
  finalAmount = tuesdayResult.finalAmount;
  discountRate = tuesdayResult.discountRate;

  //할인값
  state.currentTotalAmount = finalAmount;
  elements.CartSummary.textContent = `총액: ${Math.round(state.currentTotalAmount)}원`;

  if (discountRate > 0) {
    const span = createEl('span', { className: 'text-green-500 ml-2', text: `(${(discountRate * 100).toFixed(1)}% 할인 적용)` });
    elements.CartSummary.appendChild(span);
  }

  updateStockInfo();
  renderBonusPoints();
}

function findProductById(id) {
  const product = state.productList.find((product) => product.id === id);
  if (!product) {
    console.warn(ERROR_MESSAGES.PRODUCT.NOT_FOUND, id);
  }
  return product;
}

function calculateItemTotal(item, quantity) {
  let discount = 0;
  if (quantity >= CONSTANTS.CART.ITEM_DISCOUNT_THRESHOLD) {
    discount = CONSTANTS.DISCOUNT_TABLE[item.id] || 0;
  }
  return {
    itemTotal: item.price * quantity,
    discountedTotal: item.price * quantity * (1 - discount),
    quantity,
  };
}

//일반 할인 계산
function applyBulkDiscount(subTotal, totalAmount) {
  if (state.currentItemCount < CONSTANTS.CART.BULK_DISCOUNT_ITEM_COUNT) return { finalAmount: totalAmount, discountRate: (subTotal - totalAmount) / subTotal };

  const bulkDiscountAmt = subTotal * CONSTANTS.CART.BULK_DISCOUNT_RATE;
  const itemDiscountAmt = subTotal - totalAmount;

  if (bulkDiscountAmt > itemDiscountAmt) {
    return { finalAmount: subTotal * 1 - CONSTANTS.CART.BULK_DISCOUNT_RATE, discountRate: CONSTANTS.CART.BULK_DISCOUNT_RATE };
  }
  return { finalAmount: totalAmount, discountRate: itemDiscountAmt / subTotal };
}

//화요일 할인 계산
function applyTuesdayDiscount(totalAmount, currentDiscountRate) {
  const isTuesday = new Date().getDay() === 2;
  if (!isTuesday) return { finalAmount: totalAmount, discountRate: currentDiscountRate };

  return {
    finalAmount: totalAmount * CONSTANTS.FRIDAY_SALE.DISCOUNT_RATE,
    discountRate: Math.max(currentDiscountRate, 1 - CONSTANTS.FRIDAY_SALE.DISCOUNT_RATE),
  };
}

function main() {
  initializeState();
  createUI();
  updateSelOpts();
  calculateCartItem();
  initializeSaleSystem();
  attachEventListener(calculateCartItem);
}

main();
