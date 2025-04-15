import { state, elements } from './state.js';

export function attachEventListener(calcCart) {
  attachAddToCartHandler(calcCart);
  attachCartControlHandler(calcCart);
}

function attachAddToCartHandler(calcCart) {
  elements.AddToCartButton.addEventListener('click', handleAddToCart);

  function handleAddToCart() {
    const selItem = elements.ProductSelect.value;
    const addItemState = state.productList.find((product) => product.id === selItem);

    if (!addItemState || addItemState.count <= 0) return;

    const addItemCartContainer = document.getElementById(addItemState.id);

    if (addItemCartContainer) {
      const newQuantity = parseInt(addItemCartContainer.querySelector('span').textContent.split('x ')[1]) + 1;

      if (newQuantity <= addItemState.count) {
        addItemCartContainer.querySelector('span').textContent = addItemState.name + ' - ' + addItemState.price + '원 x ' + newQuantity;
        addItemState.count--;
      }
      if (newQuantity > addItemState.count) {
        alert('재고가 부족합니다.');
      }
    }

    if (!addItemCartContainer) {
      let newItem = document.createElement('div');
      newItem.id = addItemState.id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML =
        '<span>' +
        addItemState.name +
        ' - ' +
        addItemState.price +
        '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        addItemState.id +
        '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        addItemState.id +
        '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
        addItemState.id +
        '">삭제</button></div>';
      elements.CartContainer.appendChild(newItem);
      addItemState.count--;
    }

    calcCart();
    state.lastSel = selItem;
  }
}

function attachCartControlHandler(calcCart) {
  elements.CartContainer.addEventListener('click', function (event) {
    let tgt = event.target;
    if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
      const prodId = tgt.dataset.productId;
      let itemElem = document.getElementById(prodId);
      let prod = state.productList.find(function (p) {
        return p.id === prodId;
      });
      if (tgt.classList.contains('quantity-change')) {
        const qtyChange = parseInt(tgt.dataset.change);
        const newQuantity = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
        if (newQuantity > 0 && newQuantity <= prod.count + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])) {
          itemElem.querySelector('span').textContent = itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
          prod.count -= qtyChange;
        } else if (newQuantity <= 0) {
          itemElem.remove();
          prod.count -= qtyChange;
        } else {
          alert('재고가 부족합니다.');
        }
      } else if (tgt.classList.contains('remove-item')) {
        var remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
        prod.count += remQty;
        itemElem.remove();
      }
      calcCart();
    }
  });
}
