import React, { createContext, useState } from 'react';

const CartContext = createContext({
  cartItems: [],
  addItemToCart: (item) => { },
  removeItemFromCart: (itemId) => { },
  reduceItemQuantity: (itemId) => { },
  addItemQuantity: (itemId) => { },
  selectedBranch: null,
  setSelectedBranch: (branch) => { },
});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

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
    setSelectedBranch(branch);
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
  }

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
    return totalPrice;
  }

  const value = {
    selectedBranch,
    cartItems,
    selectBranch,
    addItemToCart,
    removeItemFromCart,
    addItemQuantity,
    reduceItemQuantity,
    hasItemInCart,
    getQuantityOfItem,
    getTotalPriceOfItem,
    getTotalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };