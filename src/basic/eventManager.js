import { state, elements } from './state.js';

export function attachEventListener(calcCart) {
  elements.AddToCartButton.addEventListener('click', function () {
    const selItem = elements.ProductSelect.value;
    const itemToAdd = state.productList.find(function (p) {
      return p.id === selItem;
    });
    if (itemToAdd && itemToAdd.count > 0) {
      const item = document.getElementById(itemToAdd.id);
      if (item) {
        const newQty =
          parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
        if (newQty <= itemToAdd.count) {
          item.querySelector('span').textContent =
            itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQty;
          itemToAdd.count--;
        } else {
          alert('재고가 부족합니다.');
        }
      } else {
        let newItem = document.createElement('div');
        newItem.id = itemToAdd.id;
        newItem.className = 'flex justify-between items-center mb-2';
        newItem.innerHTML =
          '<span>' +
          itemToAdd.name +
          ' - ' +
          itemToAdd.price +
          '원 x 1</span><div>' +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          itemToAdd.id +
          '" data-change="-1">-</button>' +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          itemToAdd.id +
          '" data-change="1">+</button>' +
          '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
          itemToAdd.id +
          '">삭제</button></div>';
        elements.CartContainer.appendChild(newItem);
        itemToAdd.count--;
      }
      calcCart();
      state.lastSel = selItem;
    }
  });
  elements.CartContainer.addEventListener('click', function (event) {
    let tgt = event.target;
    if (
      tgt.classList.contains('quantity-change') ||
      tgt.classList.contains('remove-item')
    ) {
      const prodId = tgt.dataset.productId;
      let itemElem = document.getElementById(prodId);
      let prod = state.productList.find(function (p) {
        return p.id === prodId;
      });
      if (tgt.classList.contains('quantity-change')) {
        const qtyChange = parseInt(tgt.dataset.change);
        const newQty =
          parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) +
          qtyChange;
        if (
          newQty > 0 &&
          newQty <=
            prod.count +
              parseInt(
                itemElem.querySelector('span').textContent.split('x ')[1]
              )
        ) {
          itemElem.querySelector('span').textContent =
            itemElem.querySelector('span').textContent.split('x ')[0] +
            'x ' +
            newQty;
          prod.count -= qtyChange;
        } else if (newQty <= 0) {
          itemElem.remove();
          prod.count -= qtyChange;
        } else {
          alert('재고가 부족합니다.');
        }
      } else if (tgt.classList.contains('remove-item')) {
        var remQty = parseInt(
          itemElem.querySelector('span').textContent.split('x ')[1]
        );
        prod.count += remQty;
        itemElem.remove();
      }
      calcCart();
    }
  });
}
