import React, { createContext, useState } from 'react';

const CartContext = createContext({
  cartItems: [],
  addItemToCart: (item) => {},
  removeItemFromCart: (itemId) => {},
  updateItemQuantity: (itemId, quantity) => {},
  selectedBranch: null,
  setSelectedBranch: (branch) => {},
});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateItemQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const selectBranch = (branch) => {
    setSelectedBranch(branch);
  };

  const value = {
    selectedBranch,
    cartItems,
    selectBranch,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };