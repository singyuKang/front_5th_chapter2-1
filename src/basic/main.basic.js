import buildLayout from './ utils/buildLayout.js';
import createEl from './ utils/createEl.js';
import { attachEventListener } from './eventManager.js';
import { state, elements } from './state.js';

function createUI() {
  const root = document.getElementById('app');

  elements.cartDisp = createEl('div', { id: 'cart-items', className: '' });
  elements.sum = createEl('div', {
    id: 'cart-total',
    className: 'text-xl font-bold my-4',
  });
  elements.sel = createEl('select', {
    id: 'product-select',
    className: 'border rounded p-2 mr-2',
  });
  elements.addBtn = createEl('button', {
    id: 'add-to-cart',
    className: 'bg-blue-500 text-white px-4 py-2 rounded',
    text: '추가',
  });
  elements.stockInfo = createEl('div', {
    id: 'stock-status',
    className: 'text-sm text-gray-500 mt-2',
  });

  const layout = buildLayout();
  root.appendChild(layout);
}

function initializeState() {
  state.productList = [
    { id: 'p1', name: '상품1', val: 10000, q: 50 },
    { id: 'p2', name: '상품2', val: 20000, q: 30 },
    { id: 'p3', name: '상품3', val: 30000, q: 20 },
    { id: 'p4', name: '상품4', val: 15000, q: 0 },
    { id: 'p5', name: '상품5', val: 25000, q: 10 },
  ];
}

function setUpSale() {
  setTimeout(function () {
    setInterval(function () {
      var luckyItem =
        state.productList[Math.floor(Math.random() * state.productList.length)];
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);
  setTimeout(function () {
    setInterval(function () {
      if (state.lastSel) {
        var suggest = state.productList.find(function (item) {
          return item.id !== state.lastSel && item.q > 0;
        });
        if (suggest) {
          alert(
            suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!'
          );
          suggest.val = Math.round(suggest.val * 0.95);
          updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function updateSelOpts() {
  elements.sel.innerHTML = '';
  state.productList.forEach(function (item) {
    var opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.name + ' - ' + item.val + '원';
    if (item.q === 0) opt.disabled = true;
    elements.sel.appendChild(opt);
  });
}
function calcCart() {
  state.totalAmt = 0;
  state.itemCnt = 0;
  var cartItems = elements.cartDisp.children;
  var subTot = 0;
  for (var i = 0; i < cartItems.length; i++) {
    (function () {
      var curItem;
      for (var j = 0; j < state.productList.length; j++) {
        if (state.productList[j].id === cartItems[i].id) {
          curItem = state.productList[j];
          break;
        }
      }
      var q = parseInt(
        cartItems[i].querySelector('span').textContent.split('x ')[1]
      );
      var itemTot = curItem.val * q;
      var disc = 0;
      state.itemCnt += q;
      subTot += itemTot;
      if (q >= 10) {
        if (curItem.id === 'p1') disc = 0.1;
        else if (curItem.id === 'p2') disc = 0.15;
        else if (curItem.id === 'p3') disc = 0.2;
        else if (curItem.id === 'p4') disc = 0.05;
        else if (curItem.id === 'p5') disc = 0.25;
      }
      state.totalAmt += itemTot * (1 - disc);
    })();
  }
  let discRate = 0;
  if (state.itemCnt >= 30) {
    var bulkDisc = state.totalAmt * 0.25;
    var itemDisc = subTot - state.totalAmt;
    if (bulkDisc > itemDisc) {
      state.totalAmt = subTot * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTot - state.totalAmt) / subTot;
    }
  } else {
    discRate = (subTot - state.totalAmt) / subTot;
  }
  if (new Date().getDay() === 2) {
    state.totalAmt *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }
  elements.sum.textContent = '총액: ' + Math.round(state.totalAmt) + '원';
  if (discRate > 0) {
    var span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    elements.sum.appendChild(span);
  }
  updateStockInfo();
  renderBonusPts();
}
const renderBonusPts = () => {
  state.bonusPts = Math.floor(state.totalAmt / 1000);
  var ptsTag = document.getElementById('loyalty-points');
  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    elements.sum.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + state.bonusPts + ')';
};
function updateStockInfo() {
  var infoMsg = '';
  state.productList.forEach(function (item) {
    if (item.q < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.q > 0 ? '재고 부족 (' + item.q + '개 남음)' : '품절') +
        '\n';
    }
  });
  elements.stockInfo.textContent = infoMsg;
}
function main() {
  initializeState();
  createUI();
  updateSelOpts();
  calcCart();
  setUpSale();
  attachEventListener(calcCart);
}

main();
