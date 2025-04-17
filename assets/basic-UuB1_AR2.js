import"./modulepreload-polyfill-B5Qt9EMX.js";const m={SALE_SYSTEM:{FLASH_SALE_ERROR:"번개 세일 실행 중 오류가 발생했습니다.",SUGGESTION_ERROR:"추천 상품 실행 중 오류가 발생했습니다.",NO_PRODUCTS:"판매 가능한 상품이 없습니다.",UPDATE_FAILED:"상품 옵션 업데이트에 실패했습니다."},PRODUCT:{NO_STOCK:"재고가 부족합니다.",NOT_FOUND:"상품을 찾을 수 없습니다."}},a={productList:[],selected:null,currentBonusPoints:0,currentTotalAmount:0,currentItemCount:0};function I(){a.productList=[{id:"p1",name:"상품1",price:1e4,count:50},{id:"p2",name:"상품2",price:2e4,count:30},{id:"p3",name:"상품3",price:3e4,count:20},{id:"p4",name:"상품4",price:15e3,count:0},{id:"p5",name:"상품5",price:25e3,count:10}]}function s(t,e={}){const o=document.createElement(t);return e.id&&(o.id=e.id),e.className&&(o.className=e.className),e.text&&(o.textContent=e.text),e.value&&(o.value=e.value),o}function N(){const t=s("div",{className:"bg-gray-100 p-8"}),e=s("div",{className:"max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8"}),o=s("h1",{className:"text-2xl font-bold mb-4",text:"장바구니"});return e.append(o,c.CartContainer,c.CartSummary,c.ProductSelect,c.AddToCartButton,c.StockInfoText),t.appendChild(e),t}const c={ProductSelect:null,AddToCartButton:null,CartContainer:null,CartSummary:null,StockInfoText:null};function L(){const t=document.getElementById("app");c.CartContainer=s("div",{id:"cart-items",className:""}),c.CartSummary=s("div",{id:"cart-total",className:"text-xl font-bold my-4"}),c.ProductSelect=s("select",{id:"product-select",className:"border rounded p-2 mr-2"}),c.AddToCartButton=s("button",{id:"add-to-cart",className:"bg-blue-500 text-white px-4 py-2 rounded",text:"추가"}),c.StockInfoText=s("div",{id:"stock-status",className:"text-sm text-gray-500 mt-2"});const e=N();t.appendChild(e)}function _(t){O(t),R(t)}function O(t){c.AddToCartButton.addEventListener("click",e);function e(){const o=c.ProductSelect.value,n=a.productList.find(r=>r.id===o);if(!n||n.count<=0)return;const i=document.getElementById(n.id);if(i){const r=parseInt(i.querySelector("span").textContent.split("x ")[1])+1;r<=n.count&&(i.querySelector("span").textContent=n.name+" - "+n.price+"원 x "+r,n.count--),r>n.count&&alert(m.PRODUCT.NO_STOCK)}if(!i){let r=document.createElement("div");r.id=n.id,r.className="flex justify-between items-center mb-2",r.innerHTML="<span>"+n.name+" - "+n.price+'원 x 1</span><div><button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="'+n.id+'" data-change="-1">-</button><button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="'+n.id+'" data-change="1">+</button><button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="'+n.id+'">삭제</button></div>',c.CartContainer.appendChild(r),n.count--}t(),a.lastSel=o}}function R(t){c.CartContainer.addEventListener("click",e);function e(o){const n=o.target;if(!n.classList.contains("quantity-change")&&!n.classList.contains("remove-item"))return;const i=n.dataset.productId;let r=document.getElementById(i),d=a.productList.find(l=>l.id===i);if(n.classList.contains("quantity-change")){const l=parseInt(n.dataset.change),S=r.querySelector("span"),p=parseInt(S.textContent.split("x ")[1]),T=p+l,C=S.textContent.split("x ")[0];if(T>d.count+p){alert(m.PRODUCT.NO_STOCK);return}if(T<=0){r.remove(),d.count-=l;return}S.textContent=`${C}x ${T}`,d.count-=l}if(n.classList.contains("remove-item")){const l=parseInt(r.querySelector("span").textContent.split("x ")[1]);d.count+=l,r.remove()}t()}}const u={FLASH_SALE:{CHANCE:.3,INTERVAL:3e4,MAX_DELAY:1e4},FRIDAY_SALE:{DISCOUNT_RATE:.9},SUGGESTION:{DISCOUNT_RATE:.95,INTERVAL:6e4,MAX_DELAY:2e4},DISCOUNT_TABLE:{p1:.1,p2:.15,p3:.2,p4:.05,p5:.25},CART:{ITEM_DISCOUNT_THRESHOLD:10,BULK_DISCOUNT_ITEM_COUNT:30,BULK_DISCOUNT_RATE:.25},POINTS:{EARNING_UNIT:1e3},INVENTORY:{LOW_STOCK_THRESHOLD:5}};function A(){try{c.ProductSelect.innerHTML="",a.productList.forEach(function(t){const e=s("option",{value:t.id,text:t.name+" - "+t.price+"원"});t.count===0&&(e.disabled=!0),c.ProductSelect.appendChild(e)})}catch(t){console.error(m.SALE_SYSTEM.UPDATE_FAILED,t)}}function x(){let t="";a.productList.forEach(e=>{e.count<u.INVENTORY.LOW_STOCK_THRESHOLD&&(t+=`${e.name}: ${e.count>0?`재고 부족 (${e.count}개 남음)`:"품절"}
`)}),c.StockInfoText.textContent=t}const y=()=>{a.currentBonusPoints=Math.floor(a.currentTotalAmount/u.POINTS.EARNING_UNIT);let t=document.getElementById("loyalty-points");t||(t=s("span",{id:"loyalty-points",className:"text-blue-500 ml-2"}),c.CartSummary.appendChild(t)),t.textContent=`(포인트: ${a.currentBonusPoints})`};function h(){D(),g()}function D(){const t=Math.random()*u.FLASH_SALE.MAX_DELAY;setTimeout(()=>{setInterval(()=>{try{U()}catch(e){console.error(m.SALE_SYSTEM.FLASH_SALE_ERROR,e)}},u.FLASH_SALE.INTERVAL)},t)}function U(){if(!a.productList||a.productList.length===0){console.warn(m.SALE_SYSTEM.NO_PRODUCTS);return}const t=a.productList[Math.floor(Math.random()*a.productList.length)];Math.random()<u.FLASH_SALE.CHANCE&&t.count>0&&(t.price=Math.round(t.price*u.SUGGESTION.DISCOUNT_RATE),alert(`번개세일! ' ${t.name} 이(가) 20% 할인 중입니다!`),A())}function g(){const t=Math.random()*u.SUGGESTION.MAX_DELAY;setTimeout(()=>{setInterval(()=>{try{M()}catch(e){console.error(m.SALE_SYSTEM.SUGGESTION_ERROR,e)}},u.SUGGESTION.INTERVAL)},t)}function M(){{console.warn(m.SALE_SYSTEM.NO_PRODUCTS);return}}function v(t,e){if(a.currentItemCount<u.CART.BULK_DISCOUNT_ITEM_COUNT)return{finalAmount:e,discountRate:(t-e)/t};const o=t*u.CART.BULK_DISCOUNT_RATE,n=t-e;return o>n?{finalAmount:t*(1-u.CART.BULK_DISCOUNT_RATE),discountRate:u.CART.BULK_DISCOUNT_RATE}:{finalAmount:e,discountRate:n/t}}function b(t,e){return new Date().getDay()===2?{finalAmount:t*u.FRIDAY_SALE.DISCOUNT_RATE,discountRate:Math.max(e,1-u.FRIDAY_SALE.DISCOUNT_RATE)}:{finalAmount:t,discountRate:e}}function E(){a.currentTotalAmount=0,a.currentItemCount=0;const t=c.CartContainer.children;let e=0;for(let d=0;d<t.length;d++){const l=t[d],S=B(l.id),p=parseInt(l.querySelector("span").textContent.split("x ")[1]),{itemTotal:T,discountedTotal:C,quantity:f}=P(S,p);a.currentItemCount+=f,e+=T,a.currentTotalAmount+=C}let o=v(e,a.currentTotalAmount),n=o.finalAmount,i=o.discountRate,r=b(n,i);if(n=r.finalAmount,i=r.discountRate,a.currentTotalAmount=n,c.CartSummary.textContent=`총액: ${Math.round(a.currentTotalAmount)}원`,i>0){const d=s("span",{className:"text-green-500 ml-2",text:`(${(i*100).toFixed(1)}% 할인 적용)`});c.CartSummary.appendChild(d)}x(),y()}function B(t){const e=a.productList.find(o=>o.id===t);return e||console.warn(m.PRODUCT.NOT_FOUND,t),e}function P(t,e){let o=0;return e>=u.CART.ITEM_DISCOUNT_THRESHOLD&&(o=u.DISCOUNT_TABLE[t.id]||0),{itemTotal:t.price*e,discountedTotal:t.price*e*(1-o),quantity:e}}function H(){I(),L(),A(),E(),h(),_(E)}H();
