import React, { createContext, useState } from 'react';

const CartContext = createContext({
  cartItems: [],
  addItemToCart: (item) => { },
  removeItemFromCart: (itemId) => { },
  reduceItemQuantity: (itemId) => { },
  addItemQuantity: (itemId) => { },
  selectedBranch: null,
  deliveryMethod: null,
  setSelectedBranch: (branch) => { },
  setDeliveryMethod: (deliveryMethod) => { },
});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('Trans Studio Mall Bandung');
  const [deliveryMethod, setDeliveryMethod] = useState('PICK UP');

  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const addItemQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
          : item
      )
    );
  };

  const reduceItemQuantity = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      );

      const shouldRemoveItem = updatedItems.find(
        (item) => item.id === itemId && item.quantity === 0
      );

      if (shouldRemoveItem) {
        removeItemFromCart(shouldRemoveItem.id);
      }

      return updatedItems;
    });
  };

  const selectBranch = (branch) => {
    if (branch !== selectedBranch) {
      setSelectedBranch(branch);
      resetCart();
    }
  };

  const selectDeliveryMethod = (method) => {
    setDeliveryMethod(method);
  };

  const hasItemInCart = (itemId) => {
    return cartItems.find((item) => item.id === itemId) !== undefined;
  };

  const getQuantityOfItem = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalPriceOfItem = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity * item.price : 0;
  };

  const resetCart = () => {
    setCartItems([]);
  }

  const value = {
    selectedBranch,
    deliveryMethod,
    cartItems,
    selectBranch,
    selectDeliveryMethod,
    addItemToCart,
    removeItemFromCart,
    addItemQuantity,
    reduceItemQuantity,
    hasItemInCart,
    getQuantityOfItem,
    getTotalPriceOfItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };