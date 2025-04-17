import React, { useEffect } from 'react';
import CartConatiner from './components/CartContainer';
import CartItem from './components/CartItem';
import CartTotalInfo from './components/CartTotalInfo';
import ProductSelect from './components/ProductSelect';
import StockStatus from './components/StockStatus';
import CartHeader from './components/CartHeader';
import CartItemContainer from './components/CartItemContainer';
import { useProduct } from './hooks/useProduct';
import { useCart } from './hooks/useCart';
import CartAddButton from './components/CartAddButton';
import { useSalesSystem } from './hooks/useSalesSystem';

const App: React.FC = () => {
  const initialProductList = [
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ];

  const initialCartState = {
    cartItems: [],
    selectedId: null,
    currentBonusPoints: 0,
    currentTotalAmount: 0,
    currentItemCount: 0,
    discountRate: 0,
  };

  const { products, updateProductQuantity } = useProduct(initialProductList);
  // console.log('🚀 ~ products:', products);
  const {
    cart,
    addToCart,
    setSelectedId,
    removeFromCart,
    updateCartItemQuantity,
  } = useCart(initialCartState);
  // console.log('🚀 ~ cart:', cart);

  useSalesSystem({ products });

  useEffect(() => {
    const firstAvailableProduct = products.find((p) => p.quantity > 0);
    if (firstAvailableProduct && !cart.selectedId) {
      setSelectedId(firstAvailableProduct.id);
    }
  }, [products]);

  const handleProductSelect = (productId: string) => {
    setSelectedId(productId);
  };

  const handleAddToCart = () => {
    if (!cart.selectedId) return;

    const product = products.find((p) => p.id === cart.selectedId);
    if (!product || product.quantity <= 0) {
      alert('재고가 부족합니다.');
      return;
    }

    addToCart(product);
    updateProductQuantity(product.id, -1);
  };

  const handleRemoveFromCart = (productId: string) => {
    const cartItem = cart.cartItems.find((item) => item.id === productId);
    if (cartItem) {
      updateProductQuantity(productId, cartItem.quantity);
      removeFromCart(productId);
    }
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const product = products.find((p) => p.id === productId);

    if (change > 0 && (!product || product.quantity <= 0)) {
      alert('재고가 부족합니다.');
      return;
    }

    updateCartItemQuantity(productId, change);
    updateProductQuantity(productId, -change);
  };

  return (
    <CartConatiner>
      <CartHeader />
      <CartItemContainer>
        {cart.cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            handleQuantityChange={handleQuantityChange}
            onRemove={handleRemoveFromCart}
          />
        ))}
      </CartItemContainer>
      <CartTotalInfo
        totalAmount={cart.currentTotalAmount}
        discountRate={cart.discountRate}
        bonusPoints={cart.currentBonusPoints}
      />
      <ProductSelect
        products={products}
        selectedId={cart.selectedId}
        onSelect={handleProductSelect}
      />
      <CartAddButton
        onClick={handleAddToCart}
        disabled={
          !cart.selectedId ||
          !products.find((p) => p.id === cart.selectedId)?.quantity
        }
      />
      <StockStatus />
    </CartConatiner>
  );
};

export default App;
